import { ModelTypeNames } from '../../enums/models/model-names';

export interface BaseModel {
  readonly id: ModelTypeNames;
}
