import {
  FlagCreationParams,
  FlagRepositoryId,
} from '@inmine/common/types/flags';

import { InMineAbstractFlagRepository } from './abstract-flag-repository';

export abstract class InMineAbstractBooleanFlagRepository<
  FlagId extends FlagRepositoryId,
> extends InMineAbstractFlagRepository<FlagId, boolean> {
  constructor(params?: FlagCreationParams, defaultValue?: boolean) {
    super(params, defaultValue);
  }

  set value(value: boolean) {
    this.set(value);
  }

  get value(): boolean | undefined {
    return this.get();
  }

  set(value: boolean): void {
    if (typeof value !== 'boolean') {
      throw Error(`Flag value must be boolean, but got ${typeof value}`);
    }
    super.value = value;
  }

  get(): boolean {
    const value = super.value;

    return value !== undefined ? (value as boolean) : false;
  }

  /**
   * Toggles the flag value.
   */
  toggle(): boolean {
    const value = this.get();
    this.set(!value);

    return !value;
  }
}
