import { system } from '@minecraft/server';

import {
  ChunkSection,
  DimensionTypes,
  ChunkLoadOptions,
  ChunkLoadResult,
  TickingElement,
} from '@inmine/common/types';
import { ChunkModel } from '@inmine/models/chunk-model';
import { ChunkModelFactory } from '@inmine/models/chunk-model-factory';

import { ChunkCollector } from './collector';
import {
  collectorCycleTime,
  defaultTickingRange,
  defaultTickingElementLifetime,
  maxTickingElementLifetime,
  maxTickingRange,
  chunkLoadTries,
  tickingElementSpawnTries,
} from './common/constants/defaults';
import { tickingElementIdentifier } from './common/constants/ticking-element';

export class ChunkLoader {
  private static instance: ChunkLoader;
  private readonly collector = new ChunkCollector();

  constructor() {
    if (ChunkLoader.instance) {
      ChunkLoader.instance;
    }
    ChunkLoader.instance = this;
  }

  /**
   * @returns True if collector is active.
   */
  collectorIsWorking() {
    return this.collector.runtimeIsActive;
  }

  /**
   * @returns True if chunk is force loaded.
   */
  isForceLoaded(chunk: ChunkModel): boolean {
    const section = chunk.sectionSimple;
    const cache = this.collector.cache;

    return cache.has(section) && chunk.isLoaded();
  }

  /**
   * Loads chunk using inmine-common:ticking_elements.
   * It can update load duration.
   * @param [options] includes duration (in ticks), range [2, 6] and bypassDurationLimit
   */
  async load(
    chunk: ChunkModel,
    options: ChunkLoadOptions = {
      duration: defaultTickingElementLifetime,
      range: defaultTickingRange,
    },
  ): Promise<ChunkLoadResult | boolean> {
    const validOptions = this.validateLoadOptions(options);

    let tickingElement: TickingElement | undefined =
      chunk.dimension.getEntities({
        type: tickingElementIdentifier,
        location: chunk.center,
        maxDistance: 8,
        closest: 1,
      })[0];

    if (!tickingElement) {
      const success = await this.preLoadArea(chunk);
      if (!success) return false;

      tickingElement = await this.trySpawnTickingElement(chunk);
      if (!tickingElement) {
        this.removePreLoadArea(chunk);

        return false;
      }
    }

    tickingElement.triggerEvent(
      `ticking_element:set_tick_range_${validOptions.range}`,
    );
    tickingElement.setDynamicProperty(
      'inmine-common:ticking_range',
      validOptions.range,
    );
    this.collector.add(tickingElement, validOptions.duration);
    this.removePreLoadArea(chunk);

    return {
      tickingElement: tickingElement,
      duration: validOptions.duration,
      range: validOptions.range,
    };
  }

  /**
   * Unloads provided chunk if it was force loaded earlier.
   * @remark Could not unload chunk which is not loaded by inmine-common:ticking_element
   */
  async unload(chunk: ChunkModel) {
    if (!this.isForceLoaded(chunk)) return;

    const relatedTickingElement = this.collector.cache.get(chunk.sectionSimple);
    if (relatedTickingElement && relatedTickingElement.isValid()) {
      this.collector.remove(relatedTickingElement);
    }
    return true;
  }

  forceLoadedChunks(): ChunkModel[] {
    return [...this.collector.cache.values()].map((element) =>
      this.elementChunk(element),
    );
  }

  elementChunk(element: TickingElement): ChunkModel {
    return ChunkModelFactory.createUsingEntity(element);
  }

  forceLoadedChunksStats() {
    return this.collector.stats;
  }

  /**
   * Tries to spawn ticking element entity.
   * It provides loader with ticking area to spawn ticking_element entity later.
   */
  private async trySpawnTickingElement(
    chunk: ChunkModel,
    tries: number = 0,
  ): Promise<TickingElement | undefined> {
    if (tries > tickingElementSpawnTries) return undefined;

    if (chunk.isLoaded()) {
      return chunk.dimension.spawnEntity(
        tickingElementIdentifier,
        chunk.center,
      );
    }

    const delayInTicks = 4;

    return new Promise<TickingElement | undefined>((resolve) => {
      system.runTimeout(async () => {
        const result = await this.trySpawnTickingElement(chunk, tries + 1);
        resolve(result);
      }, delayInTicks);
    });

    // return await this.trySpawnTickingElement(chunk, tries + 1);
  }

  /**
   * Tries to load chunk using /tickingarea command.
   * It provides loader with ticking area to spawn ticking_element entity later.
   */
  private async preLoadArea(
    chunk: ChunkModel,
    tries: number = 0,
  ): Promise<boolean> {
    if (tries > chunkLoadTries) return false;

    const center = chunk.center;
    try {
      const commandResult = await chunk.dimension.runCommandAsync(
        `tickingarea add circle ${center.x} ${center.y} ${center.z} 1 "${chunk.sectionSimple}"`,
      );
      if (commandResult.successCount === 1) return true;
    } catch (error) {
      console.warn(error);
    }

    return await this.preLoadArea(chunk, tries + 1);
  }

  private async removePreLoadArea(chunk: ChunkModel) {
    try {
      await chunk.dimension.runCommandAsync(
        `tickingarea remove "${chunk.sectionSimple}"`,
      );
    } catch (error) {}
  }

  private validateLoadOptions(options: ChunkLoadOptions) {
    let bypassLimits = false;
    let range = options.range;
    let duration = options.duration;

    if (options.bypassDurationLimit) {
      bypassLimits = true;
    }

    if (range > maxTickingRange) {
      range = maxTickingRange;
    } else if (range < defaultTickingRange) {
      range = defaultTickingRange;
    }

    if (duration < collectorCycleTime) {
      duration = defaultTickingElementLifetime;
    } else if (duration > maxTickingElementLifetime && !bypassLimits) {
      duration = maxTickingElementLifetime;
    }

    return {
      duration,
      range,
      bypassLimits,
    };
  }

  private async calculateForceLoadedChunksByElement(
    element: TickingElement,
  ): Promise<ChunkSection[]> {
    if (!element.isValid()) return [];

    const chunk = ChunkModelFactory.create({
      location: element.location,
      dimension: element.dimension,
    });
    let radius = element.getDynamicProperty('inmine-common:ticking_range');
    if (!radius || typeof radius !== 'number') {
      radius = 2;
    }
    const mainSecton = chunk.section;
    const dimensionId = chunk.dimension.id as DimensionTypes;
    const y = mainSecton.y;

    const result: ChunkSection[] = [];

    for (let x = mainSecton.x - radius; x <= mainSecton.x + radius; x++) {
      for (let z = mainSecton.z - radius; z <= mainSecton.z + radius; z++) {
        result.push({ x, y, z, dimensionId });
      }
    }

    return result;
  }
}
