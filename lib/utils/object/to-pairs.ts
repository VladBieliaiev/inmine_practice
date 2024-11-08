import { ObjectAsPairArray } from '@inmine/common/types';

/**
 * @param {object} obj
 * @returns An array of key, value from the object props.
 */
export function toPairs<T extends Record<string, any>>(
  obj: T,
): ObjectAsPairArray<T> {
  const pairs: ObjectAsPairArray<T> = [];
  for (const prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }

  return pairs;
}
