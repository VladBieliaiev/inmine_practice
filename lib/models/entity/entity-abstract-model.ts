import { Entity } from '@minecraft/server';

import { KeysFromArray, ObjectKeysAsString } from '@inmine/common/types/base';
import {
  EntityModelImage,
  EntityModelImagePropertyNativeTypes,
  EntityModelImageValidPropertyValues,
  ValidatedEntityModel,
} from '@inmine/common/types/models/entity-model';
import { EntityModelImagePropertyType } from '@inmine/common/types/models/entity-model/property-type';
import { inventoryContainer } from '@inmine/utils/entity/inventory-container';

import { extractPropertiesValidValues } from './helpers/extract-valid-props-values';

export abstract class InMineAbstractEntityModel<
  EntityModel extends EntityModelImage,
> {
  protected _entity: Entity | undefined;
  protected readonly validPropertyValues: EntityModelImageValidPropertyValues;

  public readonly id: EntityModel['identifier'];

  constructor(entityImage: EntityModelImage) {
    this.id = entityImage.identifier;
    this.validPropertyValues = extractPropertiesValidValues(
      entityImage.properties,
    );
  }

  protected propertyValueIsValid(
    id: string,
    value: EntityModelImagePropertyNativeTypes,
  ): boolean {
    const data = this.validPropertyValues.get(id);

    if (data === undefined) {
      return false;
    }

    switch (data.type) {
      case 'boolean':
        return value === true || value === false;
      case 'number':
        return (
          typeof value === 'number' &&
          value >= (data.values[0] as number) &&
          value <= (data.values[1] as number)
        );
      case 'string':
        return data.values.includes(value as string);
      default:
        return false;
    }
  }

  public get isValid(): boolean {
    return !!this._entity && this._entity.isValid();
  }

  public setEntity(serverEntity: Entity, silent?: boolean) {
    if (serverEntity.typeId === this.id) {
      this._entity = serverEntity;

      return this;
    }
    if (silent) {
      return;
    }
    throw Error(
      `Couldn't set model entity, because input entity ${serverEntity.typeId} does not match entity model id ${this.id}.`,
    );
  }

  public get entity(): Entity | undefined {
    if (this.isValid) {
      return this._entity!;
    }
  }

  /**
   * @remarks Triggers an entity type event. For every entity, a number of events are defined in an entities' definition for key entity behaviors; for example, creepers have a minecraft:start_exploding type event.
   */
  public triggerEvent<
    T extends KeysFromArray<ValidatedEntityModel<EntityModel>['events']>,
  >(eventId: T): void {
    if (this.isValid && eventId) {
      this._entity!.triggerEvent(eventId);
    }
  }

  /**
   * @remarks Sets an Entity Property to the provided value.
   * This property change is not applied until the next tick.
   * @throws Throws if the entity is invalid.
   */
  public setProperty<
    T extends ObjectKeysAsString<
      ValidatedEntityModel<EntityModel>['properties']
    >,
    V extends EntityModelImagePropertyType<
      T,
      ValidatedEntityModel<EntityModel>['properties']
    >,
  >(id: T, value: V): void {
    if (!this.isValid) {
      throw Error(`Couldn't set property, because entity is not valid.`);
    }
    if (
      !this.propertyValueIsValid(
        id,
        value as EntityModelImagePropertyNativeTypes,
      )
    ) {
      throw Error(
        `Entity ${this.id} property ${id} couldn't accept value: ${value}`,
      );
    }
    this._entity!.setProperty(
      id,
      value! as EntityModelImagePropertyNativeTypes,
    );
  }

  /**
   * @remarks Gets an entity Property value.
   * If the property was set using the setProperty function within the same tick, the updated value will not be reflected until the subsequent tick.
   * @throws Throws if the entity is invalid.
   */
  public getProperty<
    T extends ObjectKeysAsString<
      ValidatedEntityModel<EntityModel>['properties']
    >,
    V extends EntityModelImagePropertyType<
      T,
      ValidatedEntityModel<EntityModel>['properties']
    >,
  >(id: T): V | undefined {
    if (!this.isValid) {
      throw Error(`Couldn't get property, because entity is not valid.`);
    }

    return this._entity!.getProperty(id) as V;
  }

  /**
   * @returns Entity inventory container or undefined.
   */
  public get inventory() {
    return this.isValid ? inventoryContainer(this._entity!) : undefined;
  }
}
