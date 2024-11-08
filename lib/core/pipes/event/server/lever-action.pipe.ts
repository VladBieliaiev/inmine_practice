import { LeverActionAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '../event-pipe';

export abstract class LeverActionAfterEventPipe extends InMineAbstractEventPipe<LeverActionAfterEvent> {}
