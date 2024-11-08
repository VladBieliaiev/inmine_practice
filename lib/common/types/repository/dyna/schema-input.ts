import { SchemaMergedWithId } from './schema-with-primary-key';

export type SchemaInput<S> = S | S[];

export type SchemaInputWithId<S> =
  | SchemaMergedWithId<S>
  | SchemaMergedWithId<S>[];
