import {
  EntityQueryOptions,
  ScoreboardObjective,
  system,
  world,
} from '@minecraft/server';

import { nether, overworld, theEnd } from '@inmine/common/constants/dimension';
import {
  ChunkCollectorExpirationData,
  TickingElement,
  Ticks,
  ChunkSectionSimple,
} from '@inmine/common/types';
import { ChunkModel } from '@inmine/models/chunk-model';
import { ChunkModelFactory } from '@inmine/models/chunk-model-factory';

import {
  collectorCycleTime,
  defaultTickingElementLifetime,
} from './common/constants/defaults';
import { tickingElementIdentifier } from './common/constants/ticking-element';

export class ChunkCollector {
  private static instance: ChunkCollector;

  private static expirationScoreboard: ScoreboardObjective;
  private static expirationList: ChunkCollectorExpirationData = new Map();
  private static runtime: number | undefined;
  private static readonly forceLoadedChunksCache = new Map<
    ChunkSectionSimple,
    TickingElement
  >();

  constructor() {
    if (ChunkCollector.instance) {
      return ChunkCollector.instance;
    }

    ChunkCollector.instance = this;

    ChunkCollector.expirationScoreboard = this.loadObjective();
    this.initialize();
  }

  add(
    element: TickingElement,
    duration: Ticks = defaultTickingElementLifetime,
  ) {
    if (!element.isValid()) {
      return;
    }
    ChunkCollector.expirationList.set(element, duration);
    ChunkCollector.expirationScoreboard.setScore(element, duration);
    ChunkCollector.addToCache(element);
    ChunkCollector.runCollector();
  }

  remove(element: TickingElement) {
    if (!element.isValid()) {
      return;
    }
    ChunkCollector.removeElement(element);
  }

  findChunkElement(chunk: ChunkModel): TickingElement | undefined {
    const activeElements = this.activeElements;
    const section = chunk.sectionSimple;
    for (const element of activeElements) {
      if (
        ChunkModelFactory.createUsingEntity(element).sectionSimple === section
      ) {
        return element;
      }
    }

    return undefined;
  }

  get activeElements() {
    return ChunkCollector.expirationScoreboard
      .getParticipants()
      .map((identity) => identity.getEntity())
      .filter((e) => e !== undefined) as TickingElement[];
  }

  get runtimeIsActive() {
    return ChunkCollector.runtime !== undefined;
  }

  get cache() {
    return new Map(ChunkCollector.forceLoadedChunksCache);
  }

  get stats() {
    const result = [];
    for (const [element, duration] of ChunkCollector.expirationList) {
      result.push([element, duration]);
    }

    return result;
  }

  private loadObjective(): ScoreboardObjective {
    const objective = world.scoreboard.getObjective(tickingElementIdentifier);
    if (!objective) {
      return world.scoreboard.addObjective(tickingElementIdentifier);
    }
    return objective;
  }

  private async initialize() {
    world.afterEvents.worldInitialize.subscribe(() => {
      ChunkCollector.expirationList = this.generateExpirationList();
      if (ChunkCollector.expirationList.size > 0) {
        this.updateForceLoadedChunksCache();
        ChunkCollector.runCollector();
      }
      ChunkCollector.removeBrokenElements();
    });
    // await SystemUtils.worldIsInitialized();

    // ChunkCollector.expirationList = this.generateExpirationList();
    // if (ChunkCollector.expirationList.size > 0) {
    //   this.updateForceLoadedChunksCache();
    //   ChunkCollector.runCollector();
    // }
    // ChunkCollector.removeBrokenElements();
  }

  private generateExpirationList(): ChunkCollectorExpirationData {
    const scoresInfo = ChunkCollector.expirationScoreboard.getScores();
    if (scoresInfo.length === 0) {
      return new Map();
    }

    const result: ChunkCollectorExpirationData = new Map();
    try {
      for (const info of scoresInfo) {
        const entity = info.participant.getEntity();
        if (entity) {
          result.set(entity, info.score);
        }
      }
    } catch (e) {
      console.warn('[ChunkCollectorError]: ' + e);
    }

    return result;
  }

  private static runCollector() {
    if (ChunkCollector.runtime) {
      return;
    }
    ChunkCollector.runtime = system.runInterval(
      ChunkCollector.removeExpired,
      collectorCycleTime,
    );
  }

  private static stopCollector() {
    if (!ChunkCollector.runtime) {
      return;
    }
    system.clearRun(ChunkCollector.runtime);
    ChunkCollector.runtime = undefined;
  }

  private static removeExpired() {
    if (ChunkCollector.expirationList.size === 0) {
      ChunkCollector.stopCollector();

      return;
    }

    const data = ChunkCollector.expirationList;
    for (const [element, duration] of data) {
      const updatedDuration = duration - collectorCycleTime;
      if (updatedDuration < 1) {
        ChunkCollector.removeElement(element);
        continue;
      }
      try {
        ChunkCollector.expirationScoreboard.setScore(element, updatedDuration);
      } catch (e) {}
      data.set(element, updatedDuration);
    }

    ChunkCollector.expirationList = data;
  }

  private static removeElement(element: TickingElement) {
    ChunkCollector.removeFromCache(element);
    element.remove();
    ChunkCollector.expirationList.delete(element);
  }

  private async updateForceLoadedChunksCache() {
    ChunkCollector.forceLoadedChunksCache.clear();

    const activeElements = this.activeElements;
    if (activeElements.length > 0) {
      for (const element of activeElements) {
        ChunkCollector.addToCache(element);
      }
    }
  }

  private static addToCache(element: TickingElement) {
    const chunkSectionSimple =
      ChunkModelFactory.createUsingEntity(element).sectionSimple;
    ChunkCollector.forceLoadedChunksCache.set(chunkSectionSimple, element);
  }

  private static removeFromCache(element: TickingElement) {
    const chunkSectionSimple =
      ChunkModelFactory.createUsingEntity(element).sectionSimple;
    ChunkCollector.forceLoadedChunksCache.delete(chunkSectionSimple);
  }

  private static removeBrokenElements() {
    const objective = ChunkCollector.expirationScoreboard;
    for (const element of ChunkCollector.findTickingElements()) {
      if (!objective.hasParticipant(element)) {
        element.remove();
      }
    }
  }

  private static findTickingElements(): TickingElement[] {
    const queryOptions: EntityQueryOptions = {
      type: tickingElementIdentifier,
    };
    const tickingElements: TickingElement[] = [
      ...overworld.getEntities(queryOptions),
      ...nether.getEntities(queryOptions),
      ...theEnd.getEntities(queryOptions),
    ];

    return tickingElements;
  }
}
