import { Vector3, world } from '@minecraft/server';

import { overworld } from '@inmine/common/constants/dimension';
import {
  vaultyChunkRecordPropertyId,
  vaultyMaxEntityPerChunk,
  vaultyRepositoryId,
  vaultySpiralLocationStep,
} from '@inmine/common/constants/vaulty';
import { BaseVaultySchema } from '@inmine/common/schema';
import {
  VaultyId,
  VaultySize,
  SpiralLocationIteratorData,
} from '@inmine/common/types';
import { ChunkModelFactory } from '@inmine/models/chunk-model-factory';
import { DynaRepository } from '@inmine/repository/dyna';
import { SpiralLocationIterator } from '@inmine/tools/spiral-location-iterator';

import { VaultyRepositoryProcessor } from './processor';

export class VaultyRepositoryManager {
  private static repository = new DynaRepository<BaseVaultySchema>(
    vaultyRepositoryId,
  );
  private static spiralIterator: SpiralLocationIterator;
  private static instance: VaultyRepositoryManager;
  private static idToProcessorMap = new Map<
    VaultyId,
    VaultyRepositoryProcessor
  >();

  constructor() {
    if (!VaultyRepositoryManager.instance) {
      VaultyRepositoryManager.instance = this;
    }
    return VaultyRepositoryManager.instance;
  }

  /**
   * @returns New or existing Vaulty Repository Processor by name.
   */
  public static async create(
    vaultyId: VaultyId,
    size: VaultySize,
  ): Promise<VaultyRepositoryProcessor> {
    const instance = VaultyRepositoryManager;

    const processorFromCache = instance.idToProcessorMap.get(vaultyId);
    if (processorFromCache) {
      return processorFromCache;
    }

    const data = await instance.repository.findOne({
      vaultyId,
    });
    let location: Vector3;
    if (data) {
      location = data.location;
    } else {
      location = await instance.findLocationForVaultyEntity();
      await instance.repository.create({
        location,
        vaultyId,
      });
      instance.repository.save();
    }
    const repo = new VaultyRepositoryProcessor(vaultyId, location, size);
    VaultyRepositoryManager.idToProcessorMap.set(vaultyId, repo);

    return repo;
  }

  /**
   * @returns Repository Processor by name. Or undefined if such Repository doesn't exist.
   */
  public static async get(
    vaultyId: VaultyId,
  ): Promise<VaultyRepositoryProcessor | undefined> {
    const instance = VaultyRepositoryManager;
    if (instance.idToProcessorMap.has(vaultyId)) {
      return instance.idToProcessorMap.get(vaultyId);
    }
    const data = await instance.repository.findOne({
      vaultyId,
    });
    if (!data) {
      return undefined;
    }
    const repo = new VaultyRepositoryProcessor(vaultyId, data.location);
    VaultyRepositoryManager.idToProcessorMap.set(vaultyId, repo);

    return repo;
  }

  public static delete() {}

  /**
   * @returns True if the Repository Processor with such name exists.
   */
  public static async exists(vaultyId: VaultyId): Promise<boolean> {
    return (
      (await VaultyRepositoryManager.repository.findOne({ vaultyId })) !==
        undefined &&
      VaultyRepositoryManager.idToProcessorMap.get(vaultyId) !== undefined
    );
  }

  private static async findLocationForVaultyEntity(): Promise<Vector3> {
    const instance = VaultyRepositoryManager;
    const property = world.getDynamicProperty(vaultyChunkRecordPropertyId);
    if (!property) {
      instance.spiralIterator = new SpiralLocationIterator(
        vaultySpiralLocationStep,
      );
      instance.updateChunkRecord();
    } else {
      const lastChunkRecord = JSON.parse(
        property as string,
      ) as SpiralLocationIteratorData;
      instance.spiralIterator = new SpiralLocationIterator(
        vaultySpiralLocationStep,
        lastChunkRecord,
      );
    }

    const location = instance.getChunkCenterFromSpiralIterator();
    const vaultsByLocation = await instance.repository.find({ location });
    if (vaultsByLocation.length >= vaultyMaxEntityPerChunk) {
      return this.generateNextLocation();
    }
    return location;
  }

  private static generateNextLocation(): Vector3 {
    const instance = VaultyRepositoryManager;
    instance.spiralIterator.next();
    instance.updateChunkRecord();

    return instance.getChunkCenterFromSpiralIterator();
  }

  private static updateChunkRecord() {
    world.setDynamicProperty(
      vaultyChunkRecordPropertyId,
      JSON.stringify(VaultyRepositoryManager.spiralIterator.data.record),
    );
  }

  private static getChunkCenterFromSpiralIterator(): Vector3 {
    const data = VaultyRepositoryManager.spiralIterator.data;

    return ChunkModelFactory.create({
      location: {
        x: data.section[0],
        y: 0,
        z: data.section[1],
      },
      dimension: overworld,
    }).center;
  }
}
