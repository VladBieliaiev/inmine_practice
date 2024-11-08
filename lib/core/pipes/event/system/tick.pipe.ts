import { SystemTickAfterEvent } from '@inmine/common/types';
import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class SystemTickEventPipe extends InMineAbstractEventPipe<SystemTickAfterEvent> {}
