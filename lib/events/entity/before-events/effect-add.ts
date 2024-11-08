import { EntityEffectAddBeforeListener } from '@inmine/core/listeners/entity/effect-add';
import { EffectAddBeforeEventPipe } from '@inmine/core/pipes/event/entity/effect-add.pipe';

export function effectAdd(pipe: EffectAddBeforeEventPipe) {
  return new EntityEffectAddBeforeListener(pipe);
}
