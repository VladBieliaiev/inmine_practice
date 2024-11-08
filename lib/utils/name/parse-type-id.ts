import { Identifier, MinecraftIdentifier } from '@inmine/common/types';

/**
 * Parses typeId namespace.
 * Adds 'minecraft:' namespace, if typeId doesn't have one.
 */
export const parseTypeId = (
  typeId: string,
): Identifier | MinecraftIdentifier => {
  const hasNamespace = typeId.indexOf(':') > -1;

  return !hasNamespace ? `minecraft:${typeId}` : (typeId as Identifier);
};
