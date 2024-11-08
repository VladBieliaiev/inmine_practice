import { TargetBlockHitAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '../event-pipe';

export abstract class TargetBlockHitAfterEventPipe extends InMineAbstractEventPipe<TargetBlockHitAfterEvent> {}
