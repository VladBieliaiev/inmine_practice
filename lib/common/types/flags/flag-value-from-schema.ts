import { FlagRepositoryId } from './flag-id';
import { FlagKeyFromSchema } from './flag-key-from-schema';
import { FlagValueTypes } from './flag-value-types';
import { FlagSchemaRecord } from './schema-record';

export type FlagValueFromSchema<
  Schema extends FlagSchemaRecord<FlagRepositoryId, FlagValueTypes>,
> = Schema[FlagKeyFromSchema<Schema>];
