import { PlayerLeaveBeforeListener } from '@inmine/core/listeners/player/leave';
import { PlayerLeaveBeforeEventPipe } from '@inmine/core/pipes/event/player/leave.pipe';

export function leave(pipe: PlayerLeaveBeforeEventPipe) {
  return new PlayerLeaveBeforeListener(pipe);
}
