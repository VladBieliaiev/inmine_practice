import { ProjectileHitEntityAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '../event-pipe';

export abstract class ProjectileHitEntityAfterEventPipe extends InMineAbstractEventPipe<ProjectileHitEntityAfterEvent> {}
