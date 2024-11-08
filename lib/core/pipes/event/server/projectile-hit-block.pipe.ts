import { ProjectileHitBlockAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '../event-pipe';

export abstract class ProjectileHitBlockAfterEventPipe extends InMineAbstractEventPipe<ProjectileHitBlockAfterEvent> {}
