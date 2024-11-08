import { Container, Entity, ItemStack, Vector3 } from '@minecraft/server';

import { overworld } from '@inmine/common/constants/dimension';
import {
  vaultyEntityQueryOptions,
  vaultyTryFindEntityOptions,
  vaultyChunkLoadOptions,
  vaultyDefaultSize,
} from '@inmine/common/constants/vaulty';
import { VaultyId, VaultyEntity, Slot, VaultySize } from '@inmine/common/types';
import { ChunkModel } from '@inmine/models/chunk-model';
import { ChunkModelFactory } from '@inmine/models/chunk-model-factory';
import { EntityUtils } from '@inmine/utils/entity';
import { InventoryUtils } from '@inmine/utils/inventory';
import { SystemUtils } from '@inmine/utils/system';

import { storageElementIdentifier } from './common/storage-element';

export class VaultyRepositoryProcessor {
  private id: VaultyId;
  private location: Vector3;
  private itemsMap = new Map<Slot, ItemStack>();
  public readonly size: VaultySize = vaultyDefaultSize;

  constructor(id: VaultyId, location: Vector3, size?: VaultySize) {
    this.id = id;
    this.location = location;
    if (size) {
      this.size = size;
    }
    this.loadContent();
  }

  get content() {
    return this.itemsMap;
  }
  async container() {
    return this.vaultyEntityContainer();
  }

  set(slot: Slot, item: ItemStack) {
    if (slot > this.size || slot < 0) {
      return;
    }
    return this.itemsMap.set(slot, item);
  }

  remove(slot: Slot) {
    if (slot > this.size || slot < 0) {
      return;
    }
    return this.itemsMap.delete(slot);
  }

  clear() {
    this.itemsMap.clear();
  }

  async save() {
    const chunk = this.relatedChunk;
    if (!chunk.isLoaded()) {
      await chunk.forceLoad(vaultyChunkLoadOptions);
    }

    const container = await this.vaultyEntityContainer();
    if (!container) {
      return;
    }
    container.clearAll();
    for (const [slot, item] of this.content) {
      container.setItem(slot, item);
    }

    chunk.unload();

    return InventoryUtils.getAllItems(container);
  }

  private async loadContent() {
    const chunk = this.relatedChunk;
    if (!chunk.isLoaded()) {
      await chunk.forceLoad(vaultyChunkLoadOptions);
    }

    const container = await this.vaultyEntityContainer();
    if (!container) {
      return;
    }
    for (let slot = 0; slot < container.size; slot++) {
      const item = container.getItem(slot);
      if (item) {
        this.itemsMap.set(slot, item);
      }
    }

    chunk.unload();
  }

  private async vaultyEntityContainer() {
    const entity = await this.getVaultyEntityByLocation();
    let container = EntityUtils.inventoryContainer(entity);
    if (!container) {
      entity.triggerEvent(`storage_element:set_size_${this.size}`);
      const result = await this.tryGetEntityContainer(entity);
      container = result?.result;
    }
    return container;
  }

  private get relatedChunk(): ChunkModel {
    return ChunkModelFactory.create({
      location: this.location,
      dimension: overworld,
    });
  }

  private async getVaultyEntityByLocation(): Promise<VaultyEntity> {
    const chunk = this.relatedChunk;
    if (!chunk.isLoaded()) {
      await chunk.forceLoad(vaultyChunkLoadOptions);
    }
    const findEntityResult = await this.tryFindVaultyEntity();
    let entity;
    if (!findEntityResult || !findEntityResult.result) {
      entity = this.spawnVaultyEntity();
    } else {
      entity = findEntityResult.result;
    }
    return entity;
  }

  private spawnVaultyEntity(): VaultyEntity {
    const vaultyEntity = overworld.spawnEntity(
      storageElementIdentifier,
      this.location,
    );
    vaultyEntity.triggerEvent(`storage_element:set_size_${this.size}`);
    vaultyEntity.addTag(this.id);

    return vaultyEntity;
  }

  private tryFindVaultyEntity() {
    const action = async (params?: {
      vaultyId: VaultyId;
      location: Vector3;
    }) => {
      if (!params) {
        return { stop: true };
      }
      const entity = overworld.getEntities({
        ...vaultyEntityQueryOptions,
        tags: [params.vaultyId],
        location: params.location,
      })[0];
      if (entity) {
        return { result: entity };
      }
    };

    return SystemUtils.tryRun<
      VaultyEntity,
      { vaultyId: VaultyId; location: Vector3 }
    >(
      {
        function: action,
        params: {
          vaultyId: this.id,
          location: this.location,
        },
      },
      vaultyTryFindEntityOptions,
    );
  }

  private async tryGetEntityContainer(entity: Entity) {
    const action = async (params?: { entity: Entity }) => {
      if (!params) {
        return { stop: true };
      }
      const container = EntityUtils.inventoryContainer(params.entity);
      if (container) {
        return {
          result: container,
        };
      }
    };

    return SystemUtils.tryRun<Container, { entity: Entity }>(
      {
        function: action,
        params: {
          entity,
        },
      },
      {
        delay: 1,
        attempts: 4,
      },
    );
  }
}
