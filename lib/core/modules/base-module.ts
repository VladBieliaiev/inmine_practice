import { InMineModuleMetaData } from '@inmine/common/types/core/modules/module-metadata';

export abstract class InMineAbstractModule {
  protected metadata: InMineModuleMetaData | undefined;

  public register(): InMineModuleMetaData | undefined {
    if (!this.metadata) {
      return;
    }

    return this.metadata;
  }
}
