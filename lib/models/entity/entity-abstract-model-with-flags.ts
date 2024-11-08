import { CollectionFromObjects } from '@inmine/common/types/base';
import { FlagRepositoryId } from '@inmine/common/types/flags';
import { DefineFlagRepositoryType } from '@inmine/common/types/flags/define-flag-repository-type';
import { EntityModelImage } from '@inmine/common/types/models/entity-model';
import { InMineAbstractFlagRepository } from '@inmine/repository/flags/abstract-flag-repository';

import { InMineAbstractEntityModel } from './entity-abstract-model';

export class InMineAbstractEntityModelWithFlags<
  EntityModel extends EntityModelImage,
  EntityFlags extends CollectionFromObjects<any>,
> extends InMineAbstractEntityModel<EntityModel> {
  protected readonly flagsMap: Map<
    keyof EntityFlags,
    typeof InMineAbstractFlagRepository<any, any>
  > = new Map();

  constructor(
    entityJson: EntityModelImage,
    flags: (typeof InMineAbstractFlagRepository<any, any>)[],
  ) {
    super(entityJson);
    flags.forEach((flag) => {
      const flagInstanceId = new flag().id;
      if (flagInstanceId) {
        this.flagsMap.set(flagInstanceId, flag);
      }
    });
  }

  /**
   * Gets an entity flag instance.
   * @throws Throws if the entity is invalid.
   * @throws Throws if the flag id is invalid or not initialized for this entity model.
   */
  getFlag<
    Id extends Extract<keyof EntityFlags, FlagRepositoryId>,
    FlagType extends DefineFlagRepositoryType<Id, EntityFlags[Id]>,
  >(id: Id): FlagType {
    if (!this._entity) {
      throw Error(`Can't get flag ${String(id)} because entity undefined`);
    }
    const flagInstance = this.flagsMap.get(id);
    if (!flagInstance) {
      throw Error(`Flag ${String(id)} isn't initialized for entity ${this.id}`);
    }

    return new flagInstance().setTarget(this._entity) as FlagType;
  }

  /**
   * Sets an entity flag value by flag id.
   * @throws Throws if the entity is invalid.
   * @throws Throws if the flag id is invalid or not initialized for this entity model.
   */
  setFlagValue<
    Id extends Extract<keyof EntityFlags, FlagRepositoryId>,
    Value extends EntityFlags[Id],
  >(id: Id, value: Value): void {
    const flag = this.getFlag(id);
    if (flag) {
      flag.value = value;
    }
  }

  /**
   * Get an entity flag value by flag id.
   * @throws Throws if the entity is invalid.
   * @throws Throws if the flag id is invalid or not initialized for this entity model.
   */
  getFlagValue<
    Id extends Extract<keyof EntityFlags, FlagRepositoryId>,
    Value extends EntityFlags[Id],
  >(id: Id): Value | undefined {
    const flag = this.getFlag(id);
    if (flag) {
      return flag.value as Value;
    }
  }
}
