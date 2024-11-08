import { EntityEffectAddAfterListener } from '@inmine/core/listeners/entity/effect-add';
import { EffectAddAfterEventPipe } from '@inmine/core/pipes/event/entity/effect-add.pipe';

export function effectAdd(pipe: EffectAddAfterEventPipe) {
  return new EntityEffectAddAfterListener(pipe);
}
