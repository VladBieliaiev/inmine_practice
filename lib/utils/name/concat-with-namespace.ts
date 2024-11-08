import { Identifier } from '@inmine/common/types';

import { parseTypeId } from './parse-type-id';

/**
 * @returns An Identifier like string 'namespace:id'. If namespace is empty, adds 'minecraft:' namespace to id
 */
export const concatWithNamespace = (
  namespace: string,
  id: string,
): Identifier => {
  return !!namespace
    ? (namespace.concat(':').concat(id) as Identifier)
    : parseTypeId(id);
};
