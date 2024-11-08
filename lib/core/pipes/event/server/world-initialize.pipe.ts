import { WorldInitializeAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '../event-pipe';

export abstract class WorldInitializeAfterEventPipe extends InMineAbstractEventPipe<WorldInitializeAfterEvent> {}
