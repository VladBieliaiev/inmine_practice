import { world } from '@minecraft/server';

import { DynaRepoId } from '@inmine/common/types';

import { dynaRepoHalfId } from './constants';
import { DynaRepositoryProcessor } from './processor';

export class DynaRepositoryManager {
  private static instance: DynaRepositoryManager | undefined;
  private static loadedRepos = new Map<
    DynaRepoId,
    DynaRepositoryProcessor<any>
  >();
  private constructor() {
    if (!DynaRepositoryManager.instance) {
      DynaRepositoryManager.instance = this;
    }
    return DynaRepositoryManager.instance;
  }

  /**
   * @returns New or existing Repository Processor by name
   */
  public static create<Schema>(
    repoId: DynaRepoId,
  ): DynaRepositoryProcessor<Schema> {
    const repo = new DynaRepositoryProcessor<Schema>(repoId);
    DynaRepositoryManager.loadedRepos.set(repoId, repo);

    return repo;
  }

  /**
   * @returns Repository Processor by name. Or undefined if such Repository doesn't exist.
   */
  public static load<Schema>(
    repoId: DynaRepoId,
  ): DynaRepositoryProcessor<Schema> | undefined {
    if (this.exists(repoId)) {
      return DynaRepositoryManager.loadedRepos.get(repoId);
    }
    return undefined;
  }

  /**
   * @returns True if the Repository Processor with such name exists.
   */
  public static exists(repoId: DynaRepoId): boolean {
    return (
      world
        .getDynamicPropertyIds()
        .includes(`${dynaRepoHalfId}:${repoId}_size`) &&
      DynaRepositoryManager.loadedRepos.has(repoId)
    );
    // .includes(`${dynaRepoHalfId}:${name}_attributes`);
  }
}
