import { EffectAddAfterEvent, EffectAddBeforeEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class EffectAddAfterEventPipe extends InMineAbstractEventPipe<EffectAddAfterEvent> {}

export abstract class EffectAddBeforeEventPipe extends InMineAbstractEventPipe<EffectAddBeforeEvent> {}
