import { ArtifexEnv } from '@inmine/artifex/tools/env/environment';
import { ArtifexLogger } from '@inmine/artifex/tools/logger/logger';
import { Identifier } from '@inmine/common';
import { EntityPropetyTypes } from '@inmine/common/types/entity/entity-propety-types';

import { ArtifexEntityModel } from './interfaces/entity-model';

export abstract class ArtifexEntityModelProperties {
  constructor(protected readonly model: ArtifexEntityModel) {}

  public modelIsValid(property: Identifier): boolean {
    if (!this.model.isValid) {
      if (ArtifexEnv.debug) {
        ArtifexLogger.error(
          `Entity ${this.model.entity.id} couldn't update property ${property}, because it's not valid.`,
        );
      }

      return false;
    }
    return true;
  }

  protected setProperty<T extends EntityPropetyTypes>(
    property: Identifier,
    value: T,
  ) {
    if (this.modelIsValid(property)) {
      this.model.entity.setProperty(property, value);
    }
  }

  protected getProperty<T>(property: Identifier) {
    return this.model.entity.getProperty(property) as T | undefined;
  }
}
