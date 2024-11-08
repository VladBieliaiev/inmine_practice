import {
  InMineAbstractFlagRepository,
  InMineAbstractNumericFlagRepository,
  InMineAbstractObjectFlagRepository,
} from '@inmine/repository/flags';

import { FlagRepositoryId } from './flag-id';
import { FlagValueTypes } from './flag-value-types';
import { FlagSchemaRecord } from './schema-record';

export type DefineFlagRepositoryType<
  Id extends FlagRepositoryId,
  V extends FlagValueTypes,
> = V extends object
  ? InMineAbstractObjectFlagRepository<FlagSchemaRecord<Id, V>>
  : V extends number
    ? InMineAbstractNumericFlagRepository<Id>
    : InMineAbstractFlagRepository<Id, any>;
