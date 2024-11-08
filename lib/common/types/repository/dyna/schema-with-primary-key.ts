import { SchemaId } from './schema-id';
import { OneOrMany } from '../../base/one-or-many';

export type SchemaAttributes = {
  _id: SchemaId;
};

export type SchemaMergedWithId<Schema> = Schema & SchemaAttributes;

export type OneOrManySchema<S> = OneOrMany<SchemaMergedWithId<S>>;
