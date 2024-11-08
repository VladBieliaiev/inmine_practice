import { ButtonPushAfterEvent, Vector3 } from '@minecraft/server';

import { DimensionTypes } from '@inmine/common/types';
import { rawDimensionId } from '@inmine/utils/dimension/raw-dimension-id';
import { center } from '@inmine/utils/location/center';

import { InMineAbstractEventPipe } from '../event-pipe';

export abstract class ButtonPushAfterEventPipe extends InMineAbstractEventPipe<ButtonPushAfterEvent> {
  matchesDimension(
    e: ButtonPushAfterEvent,
    dimensionId: DimensionTypes | string,
  ): boolean {
    return rawDimensionId(e.dimension) === dimensionId;
  }

  matchesLocation(e: ButtonPushAfterEvent, location: Vector3): boolean {
    const sourceCenter = center(e.block.location);
    const destCenter = center(location);

    return (
      sourceCenter.x === destCenter.x &&
      sourceCenter.y === destCenter.y &&
      sourceCenter.z === destCenter.z
    );
  }
}
