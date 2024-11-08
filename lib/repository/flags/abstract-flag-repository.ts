import { Entity, ItemStack } from '@minecraft/server';

import { DynamicPropertyValues } from '@inmine/common/types/dynamic-property';
import {
  FlagCreationParams,
  FlagRepositoryId,
  FlagValueTypes,
} from '@inmine/common/types/flags';
import { FlagTarget } from '@inmine/common/types/flags/flag-target';

export class InMineAbstractFlagRepository<
  Id extends FlagRepositoryId,
  Value extends FlagValueTypes,
> {
  public readonly id: FlagRepositoryId | undefined;
  protected _target: FlagTarget | undefined;

  constructor(
    params?: FlagCreationParams,
    defaultValue?: DynamicPropertyValues,
  ) {
    if (!params) {
      return;
    }
    if (params.target) {
      this._target = params.target;
    }
    if (params.flagId) {
      this.id = params.flagId as Id;
    }

    if (defaultValue !== undefined && this.value === undefined) {
      this.setOrgValue(defaultValue);
    }
  }

  protected canUpdate(): boolean {
    return (
      this.id !== undefined &&
      this._target !== undefined &&
      (this._target instanceof Entity ? this._target.isValid() : true)
    );
  }
  protected setOrgValue(value: DynamicPropertyValues): void {
    if (!this.canUpdate()) {
      return;
    }
    this._target!.setDynamicProperty(this.id!, value);
  }

  protected targetId() {
    return this.target instanceof Entity
      ? (this.target as Entity).typeId
      : this.target instanceof ItemStack
        ? (this.target as ItemStack).typeId
        : 'world';
  }

  /**
   * Sets flag target.
   */
  setTarget(target: FlagTarget) {
    this._target = target;

    return this;
  }

  /**
   * Gets flag target.
   */
  get target() {
    return this._target;
  }

  /**
   * Sets current flag value.
   */
  // setValue(value: DynamicPropertyValues): void {
  //   this.setOrgValue(value);
  // }

  /**
   * Sets current flag value.
   */
  set value(value: DynamicPropertyValues) {
    this.setOrgValue(value);
  }

  /**
   * Gets current flag value.
   */
  get value(): Value | undefined {
    if (!this.canUpdate()) {
      return;
    }
    return this._target!.getDynamicProperty(this.id!) as Value;
  }

  clear(): void {
    if (!this.canUpdate()) {
      return;
    }
    this._target!.setDynamicProperty(this.id!, undefined);
  }
}
