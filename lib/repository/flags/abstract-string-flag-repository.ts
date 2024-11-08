import { dynamicPropertyStringLimit } from '@inmine/common/constants/dynamic-property';
import {
  FlagCreationParams,
  FlagRepositoryId,
} from '@inmine/common/types/flags';

import { InMineAbstractFlagRepository } from './abstract-flag-repository';

export abstract class InMineAbstractStringFlagRepository<
  FlagId extends FlagRepositoryId,
  FlagValue extends string,
> extends InMineAbstractFlagRepository<FlagId, FlagValue> {
  constructor(params?: FlagCreationParams, defaultValue?: FlagValue) {
    super(params);

    if (defaultValue !== undefined && this.value === undefined) {
      this.set(defaultValue);
    }
  }

  set(value: FlagValue): void {
    if (typeof value !== 'string') {
      throw Error(`Flag value must be string, but got ${typeof value}`);
    }
    if (value.length > dynamicPropertyStringLimit) {
      throw Error(
        `Flag value string lenght limit of ${dynamicPropertyStringLimit} reached with your ${value.length}`,
      );
    }
    super.value = value;
  }

  get(): FlagValue | '' {
    const value = super.value;

    return value !== undefined ? (value as FlagValue) : '';
  }
}
