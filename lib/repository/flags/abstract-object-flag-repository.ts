import { dynamicPropertyStringLimit } from '@inmine/common/constants/dynamic-property';
import {
  FlagSchemaRecord,
  FlagCreationParams,
  FlagKeyFromSchema,
  FlagRepositoryId,
  FlagValueFromSchema,
  FlagValueTypes,
} from '@inmine/common/types/flags';

import { InMineAbstractFlagRepository } from './abstract-flag-repository';

export abstract class InMineAbstractObjectFlagRepository<
  Schema extends FlagSchemaRecord<FlagRepositoryId, FlagValueTypes>,
> extends InMineAbstractFlagRepository<
  FlagKeyFromSchema<Schema>,
  FlagValueFromSchema<Schema>
> {
  constructor(
    params?: FlagCreationParams,
    defaultValue?: FlagValueFromSchema<Schema>,
  ) {
    super(params);

    if (defaultValue !== undefined && this.value === undefined) {
      this.set(defaultValue);
    }
  }

  set value(value: FlagValueFromSchema<Schema>) {
    this.set(value);
  }

  get value(): FlagValueFromSchema<Schema> | undefined {
    return super.value;
  }

  set(value: FlagValueFromSchema<Schema>): void {
    const stringifiedValue = this.verifyObjectByLimit(value);
    if (stringifiedValue) {
      super.value = stringifiedValue;
    }
  }
  get(): FlagValueFromSchema<Schema> | undefined {
    return this.verifyObjectFromString(super.value as string);
  }

  protected verifyObjectByLimit(
    value: FlagValueFromSchema<Schema>,
  ): string | undefined {
    try {
      const stringifiedValue = JSON.stringify(value);
      if (stringifiedValue.length > dynamicPropertyStringLimit) {
        throw Error(
          `Flag value object limit of ${dynamicPropertyStringLimit} reached with your ${stringifiedValue.length}`,
        );
      }
      return stringifiedValue;
    } catch (error) {
      console.error(error);
    }
  }

  protected verifyObjectFromString(
    value: string,
  ): FlagValueFromSchema<Schema> | undefined {
    try {
      if (typeof value !== 'string') {
        throw Error(
          `Target ${this.targetId()} has invalid value of ${this.id} flag`,
        );
      }
      return JSON.parse(value);
    } catch (error) {
      console.error(error);
    }
  }
}
