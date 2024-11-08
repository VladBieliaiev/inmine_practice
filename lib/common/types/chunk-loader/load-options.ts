import { Ticks } from '@inmine/common';

export type ChunkLoadOptions = {
  duration: Ticks;
  range: number;
  bypassDurationLimit?: boolean;
};
