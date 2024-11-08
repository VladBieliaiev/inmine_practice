import {
  VaultyCreateOptions,
  VaultyId,
  VaultySize,
} from '@inmine/common/types';

import { VaultyRepositoryManager } from './manager';
import { VaultyRepositoryPanel } from './panel';
import { VaultyRepositoryProcessor } from './processor';

export class VaultyRepository {
  /**
   * @returns Vaulry Repository Panel using name and size.
   */
  public static async load(
    vaultyName: string,
    options: VaultyCreateOptions = {
      size: 54,
    },
  ) {
    const processor = await VaultyRepository.loadProcessor(
      vaultyName,
      options.size,
    );

    return new VaultyRepositoryPanel(processor);
  }

  private static vaultyId(name: string): VaultyId {
    return `inmine-vaulty-repo:${name}`;
  }

  private static async loadProcessor(
    name: string,
    size: VaultySize,
  ): Promise<VaultyRepositoryProcessor> {
    const vaultyId = VaultyRepository.vaultyId(name);

    if (await VaultyRepositoryManager.exists(vaultyId)) {
      const processor = await VaultyRepositoryManager.get(vaultyId);
      if (processor) {
        return processor;
      }
    }
    return await VaultyRepositoryManager.create(vaultyId, size);
  }
}
