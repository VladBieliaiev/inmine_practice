import { InMineAbstractModule } from '@inmine/core/modules/base-module';

import { ChunkLoader } from './loader';

/**
 * Chunk loader module can be used as module dependecy to register a Chunk Loader instance.
 */
export class ChunkLoaderModule extends InMineAbstractModule {
  constructor() {
    super();
    new ChunkLoader();
  }
}
