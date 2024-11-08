import { InMineModuleMetaData } from '@inmine/common/types/core/modules/module-metadata';
import { InMineAbstractModule } from '@inmine/core/modules/base-module';

export class VladProjectModule extends InMineAbstractModule {
  protected metadata: InMineModuleMetaData = {
    dependencies: [],
    listeners: [],
  };
}
