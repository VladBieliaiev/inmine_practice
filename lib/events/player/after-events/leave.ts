import { PlayerLeaveAfterListener } from '@inmine/core/listeners/player/leave';
import { PlayerLeaveAfterEventPipe } from '@inmine/core/pipes/event/player/leave.pipe';

export function leave(pipe: PlayerLeaveAfterEventPipe) {
  return new PlayerLeaveAfterListener(pipe);
}
