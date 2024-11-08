import { Entity } from '@minecraft/server';

export type ChunkLoadResult = {
  tickingElement: Entity;
  duration: number;
  range: number;
};
