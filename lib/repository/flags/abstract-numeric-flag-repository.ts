import { dynamicPropertyNumberLimit } from '@inmine/common/constants/dynamic-property';
import {
  FlagCreationParams,
  FlagRepositoryId,
} from '@inmine/common/types/flags';

import { InMineAbstractFlagRepository } from './abstract-flag-repository';

export abstract class InMineAbstractNumericFlagRepository<
  FlagId extends FlagRepositoryId,
> extends InMineAbstractFlagRepository<FlagId, number> {
  constructor(params?: FlagCreationParams, defaultValue?: number) {
    super(params);

    if (defaultValue !== undefined && this.value === undefined) {
      this.set(defaultValue);
    }
  }

  set value(value: number) {
    this.set(value);
  }

  get value(): number | undefined {
    return this.get();
  }

  set(value: number): void {
    if (value > dynamicPropertyNumberLimit) {
      throw Error(
        `Flag number value limit ${dynamicPropertyNumberLimit} reached with ${value}. Please use lower values.`,
      );
    }
    super.value = value;
  }
  get(): number {
    const value = super.value;

    return value !== undefined ? (value as number) : 0;
  }

  add(amount: number): number {
    let value = this.get();
    value += amount;
    this.set(value);

    return value;
  }

  sub(amount: number): number {
    let value = this.get();
    value -= amount;
    this.set(value);

    return value;
  }

  mul(amount: number): number {
    let value = this.get();
    value += amount;
    this.set(value);

    return value;
  }

  /**
   * Divides the flag value by the given amount.
   */
  div(amount: number): number {
    let value = this.get();
    if (amount !== 0) {
      value /= amount;
    } else {
      value = 0;
    }

    this.set(value);

    return value;
  }

  pov(amount: number): number {
    let value = this.get();
    value **= amount;
    this.set(value);

    return value;
  }
}
