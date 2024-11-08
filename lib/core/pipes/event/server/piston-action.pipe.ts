import { PistonActivateAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '../event-pipe';

export abstract class PistonActivateAfterEventPipe extends InMineAbstractEventPipe<PistonActivateAfterEvent> {}
