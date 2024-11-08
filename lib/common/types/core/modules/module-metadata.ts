import { InMineEventListenerInterface } from '@inmine/common/interfaces/events/event-listener';
import { InMineBaseService } from '@inmine/common/interfaces/modules';

import { InMineBaseModuleRef } from './module-ref';
import { CreatableClass } from '../../base';

export type InMineModuleMetaData = {
  dependencies?: InMineBaseModuleRef[];
  listeners?: InMineEventListenerInterface[];
  services?: CreatableClass<InMineBaseService>[];
  registerActions?: (() => void)[];
  registerAfterWorldLoad?: boolean;
};
