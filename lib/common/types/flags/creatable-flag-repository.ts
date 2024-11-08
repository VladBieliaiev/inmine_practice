import { InMineAbstractFlagRepository } from '@inmine/repository/flags/abstract-flag-repository';

import { CreatableClass } from '../base';

export type CreatableClassFlagRepository = CreatableClass<
  InMineAbstractFlagRepository<any, any>
>;
