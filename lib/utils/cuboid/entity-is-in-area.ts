import { Entity, Player } from '@minecraft/server';

import { CuboidArea } from '@inmine/common/types';

/**
 * @returns True if entity is in specified area.
 */
export const entityIsInArea = (entity: Entity, area: CuboidArea): boolean => {
  // @TODO: Add session check instead of area stringify.
  const checkTag = `inmine_common_cuboid_is_in_area_${JSON.stringify(area)}`;
  let entityPointer = '';
  let entityIdTag = '';

  if (entity instanceof Player) {
    entityPointer = `name=${entity.name},`;
  } else {
    entityIdTag = checkTag + `_eId_${entity.id}`;
    entityPointer = `tag=${entityIdTag},`;
    entity.addTag(entityIdTag);
  }
  if (!entityPointer) {
    return false;
  }

  const result =
    entity.dimension.runCommand(
      `tag @a[${entityPointer}x=${area.x},dx=${area.dx},y=${area.y},dy=${area.y},z=${area.z},dz=${area.dz}] add ${checkTag}`,
    ).successCount === 1;

  if (entityIdTag) {
    entity.removeTag(entityIdTag);
  }
  entity.removeTag(checkTag);

  return result;
};
