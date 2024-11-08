import { FlagRepositoryId } from './flag-id';
import { FlagValueTypes } from './flag-value-types';
import { FlagSchemaRecord } from './schema-record';

export type FlagKeyFromSchema<
  Schema extends FlagSchemaRecord<FlagRepositoryId, FlagValueTypes>,
> = Extract<keyof Schema, FlagRepositoryId>;
