import {
  DeepPartialDynaSchema,
  SchemaMergedWithId,
  ObjectLiteral,
  ResultWithSuccessAndMessage,
  SchemaInputWithId,
  OneOrManySchema,
  SchemaInput,
} from '@inmine/common/types';
import { ObjectUtils } from '@inmine/utils/object';

import { DynaRepositoryManager } from './manager';
import { DynaRepositoryProcessor } from './processor';

export class DynaRepository<Schema extends ObjectLiteral> {
  private readonly processor: DynaRepositoryProcessor<Schema>;
  constructor(repoName: string) {
    const processor = DynaRepositoryManager.load<Schema>(repoName);
    if (!processor) {
      this.processor = DynaRepositoryManager.create<Schema>(repoName);

      return this;
    }
    this.processor = processor;
  }

  /**
   * Saves all data to the dynamic properties.
   */
  async save(): Promise<ResultWithSuccessAndMessage> {
    return this.processor.save();
  }

  /**
   * Creates schema or schemas in the repository.
   */
  async create(
    schemaInput: SchemaInput<Schema>,
  ): Promise<OneOrManySchema<Schema>> {
    return this.processor.create(schemaInput);
  }

  /**
   * Finds schemas that matches given options.
   */
  findSync(
    options?: DeepPartialDynaSchema<Schema | SchemaMergedWithId<Schema>>,
  ): SchemaMergedWithId<Schema>[] {
    if (!options || !Object.keys(options).length) {
      return [];
    }

    if (options._id) {
      const foundSchema = this.processor.getById(options._id as number);
      if (!foundSchema) {
        return [];
      }
      return [foundSchema];
    }

    const optionsPair = ObjectUtils.toPairs(options);
    const result: SchemaMergedWithId<Schema>[] = [];

    for (const [id, s] of this.processor.data.entries()) {
      for (const [key, value] of optionsPair) {
        if (s[key] === value) {
          result.push(this.processor.getById(id)!);
        }
      }
    }

    return result;
  }

  /**
   * Finds schemas that matches given options asynchronously.
   */
  async find(
    options?: DeepPartialDynaSchema<Schema | SchemaMergedWithId<Schema>>,
  ): Promise<SchemaMergedWithId<Schema>[]> {
    return this.findSync(options);
  }

  /**
   * Finds first schema that matches given options if any.
   */
  findOneSync(
    options: DeepPartialDynaSchema<Schema | SchemaMergedWithId<Schema>>,
  ): SchemaMergedWithId<Schema> | undefined {
    if (!options || !Object.keys(options).length) {
      return undefined;
    }

    if (options._id) {
      return this.processor.getById(options._id as number);
    }
    const optionsPair = ObjectUtils.toPairs(options);

    for (const [id, s] of this.processor.data.entries()) {
      for (const [key, value] of optionsPair) {
        if (s[key] === value) {
          return this.processor.getById(id)!;
        }
      }
    }

    return;
  }

  /**
   * Finds first schema that matches given options asynchronously.
   */
  async findOne(
    options: DeepPartialDynaSchema<Schema | SchemaMergedWithId<Schema>>,
  ): Promise<SchemaMergedWithId<Schema> | undefined> {
    return this.findOneSync(options);
  }

  /**
   * Finds all repository schemas.
   */
  findAll(): SchemaMergedWithId<Schema>[] | undefined {
    return this.processor.dataArray;
  }

  /**
   * Updates schema or schemas in the repository.
   * It will skip schema with non-existing ids.
   */
  async update(
    schemaInput: SchemaInputWithId<Schema>,
  ): Promise<OneOrManySchema<Schema>> {
    return this.processor.update(schemaInput);
  }

  /**
   * Removes schema or schemas in the repository.
   */
  removeSync(schemaInput: SchemaInputWithId<Schema>) {
    return this.processor.remove(schemaInput);
  }

  /**
   * Removes schema or schemas in the repository asynchronously.
   */
  async remove(schemaInput: SchemaInputWithId<Schema>) {
    return this.processor.remove(schemaInput);
  }

  /**
   * Deletes schema or schemas by a given keys.
   */
  async delete(
    partialSchemaInput: SchemaInputWithId<
      DeepPartialDynaSchema<SchemaMergedWithId<Schema>>
    >,
  ) {
    if (!Array.isArray(partialSchemaInput) || !partialSchemaInput.length) {
      return;
    }

    const schemasToDelete: SchemaMergedWithId<Schema>[] = [];
    for (const searchedSchema of partialSchemaInput) {
      const foundSchema = await this.find(searchedSchema);
      if (foundSchema.length) {
        schemasToDelete.push(...foundSchema);
      }
    }
    if (!schemasToDelete.length) {
      return;
    }
    this.processor.remove(schemasToDelete);
  }

  /**
   * Completely clears repository data.
   */
  clear() {
    this.processor.clear();
  }
}
