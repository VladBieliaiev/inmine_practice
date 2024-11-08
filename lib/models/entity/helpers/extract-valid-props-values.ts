import {
  EntityModelImageProperties,
  EntityModelImageEnumProperty,
  EntityModelImagePropertyNativeTypes,
  EntityModelImageNumberProperty,
  EntityModelImageValidPropertyValues,
} from '@inmine/common/types/models/entity-model';

export const extractPropertiesValidValues = (
  props?: EntityModelImageProperties,
): EntityModelImageValidPropertyValues => {
  const result = new Map();
  if (!props) {
    return result;
  }
  for (const [key, value] of new Map(Object.entries(props))) {
    let type = 'boolean';
    let values: EntityModelImagePropertyNativeTypes[] = [true, false];

    const rangeType = (value as EntityModelImageNumberProperty)['range'];
    if (rangeType) {
      type = 'number';
      values = [...rangeType];
    }
    const enumType = (value as EntityModelImageEnumProperty)['values'];
    if (enumType) {
      type = 'string';
      values = [...enumType];
    }

    result.set(key, {
      type,
      values: values,
    });
  }

  return result;
};
