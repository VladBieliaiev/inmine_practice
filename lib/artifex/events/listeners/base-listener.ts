import { ArtifexEventListenerInterface } from '@inmine/artifex/common';

export class ArtifexBaseEventListener implements ArtifexEventListenerInterface {
  listen(): void {}

  mute(): void {}
}
