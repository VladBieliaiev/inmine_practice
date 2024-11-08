import { world } from '@minecraft/server';

import {
  DynaRepoCompleteId,
  SchemaMergedWithId,
  ResultWithSuccessAndMessage,
  OneOrManySchema,
  SchemaInputWithId,
  SchemaId,
  DynaProcessorMemory,
  SchemaInput,
} from '@inmine/common/types';

import { dynaRepoHalfId } from './constants';

export class DynaRepositoryProcessor<Schema> {
  private readonly repoId: DynaRepoCompleteId;
  private readonly memory: DynaProcessorMemory<Schema> = new Map();
  private size: number;
  private lastId: number;

  constructor(repoName: string) {
    this.repoId = `${dynaRepoHalfId}:${repoName}`;
    this.size = this.repoSize;
    this.lastId = 0;

    if (this.size < 1) {
      return this;
    }

    this.loadToLocalData();
  }

  get data(): DynaProcessorMemory<Schema> {
    if (!this.memory.size) {
      return new Map();
    }
    return new Map([...this.memory.entries()]);
  }

  get dataArray() {
    return this.transformMemoryToArray();
  }

  getById(id: SchemaId): SchemaMergedWithId<Schema> | undefined {
    const schema = this.memory.get(id);
    if (!schema) return;
    return {
      _id: id,
      ...schema,
    };
  }

  async save(): Promise<ResultWithSuccessAndMessage> {
    await this.clearDynamicRelatedProperties();

    const splitedData =
      JSON.stringify(this.transformMemoryToArray()).match(/.{1,8000}/g) || [];
    splitedData.forEach((str, index) => {
      world.setDynamicProperty(`${this.repoId}_${index}`, str);
    });

    this.updateRepoSize(splitedData.length);

    return {
      success: true,
    };
  }

  async create(
    schemaInput: SchemaInput<Schema>,
  ): Promise<OneOrManySchema<Schema>> {
    if (!Array.isArray(schemaInput)) {
      return this.createSchema(
        schemaInput as Schema,
      ) as OneOrManySchema<Schema>;
    }

    if (!schemaInput.length) {
      return [] as OneOrManySchema<Schema>;
    }
    const createdSchemas = [];
    for (const schema of schemaInput) {
      createdSchemas.push(this.createSchema(schema));
    }

    return createdSchemas as OneOrManySchema<Schema>;
  }

  async update(
    schemaInput: SchemaInputWithId<Schema>,
  ): Promise<OneOrManySchema<Schema>> {
    const schemasToProcess = Array.isArray(schemaInput)
      ? schemaInput
      : [schemaInput];
    if (!schemasToProcess.length) {
      return [] as OneOrManySchema<Schema>;
    }
    for (const updatedData of schemasToProcess) {
      const id = updatedData._id;
      const data = this.memory.get(id);
      if (!data) {
        continue;
      }
      this.memory.set(id, updatedData);
    }

    return schemaInput as OneOrManySchema<Schema>;
  }

  remove(schemaInput: SchemaInputWithId<Schema>) {
    const schemasToProcess = Array.isArray(schemaInput)
      ? schemaInput
      : [schemaInput];
    if (!schemasToProcess.length) {
      return;
    }
    for (const schema of schemasToProcess) {
      this.memory.delete(schema._id);
    }
  }

  async clear() {
    this.clearDynamicRelatedProperties();
    this.updateRepoSize(0);
    this.memory.clear();
  }

  private get repoSize(): number {
    const size = world.getDynamicProperty(`${this.repoId}_size`);
    if (!size) return 0;
    return size as number;
  }

  private loadToLocalData() {
    const result = this.parseDynamicPropertyData();
    this.convertArrayToMemory(result);
    if (!result.length) {
      this.lastId = 0;
    } else {
      this.lastId = result[result.length - 1]._id;
    }
  }

  private parseDynamicPropertyData(): SchemaMergedWithId<Schema>[] {
    let stringifiedData = '';
    for (let i = 0; i < this.size; i++) {
      stringifiedData += world.getDynamicProperty(`${this.repoId}_${i}`);
    }
    if (stringifiedData === '') {
      return [];
    }

    try {
      return JSON.parse(stringifiedData) as SchemaMergedWithId<Schema>[];
    } catch (error) {}

    return [];
  }

  private createSchema(schema: Schema): SchemaMergedWithId<Schema> {
    this.lastId += 1;
    const id = this.lastId;
    this.memory.set(id, schema);

    return {
      _id: id,
      ...schema,
    };
  }

  private updateRepoSize(size: number) {
    this.size = size;
    world.setDynamicProperty(`${this.repoId}_size`, size);
  }

  private async clearDynamicRelatedProperties() {
    for (let i = 0; i < this.size; i++) {
      world.setDynamicProperty(`${this.repoId}_${i}`, undefined);
    }
  }

  private transformMemoryToArray(): SchemaMergedWithId<Schema>[] {
    const data: SchemaMergedWithId<Schema>[] = [];
    if (this.memory.size) {
      this.memory.forEach((v, k) => {
        data.push({
          _id: k,
          ...v,
        });
      });
    }
    return data;
  }

  private convertArrayToMemory(input: SchemaMergedWithId<Schema>[]) {
    if (input.length) {
      for (const s of input) {
        const id = s._id;
        if (id !== undefined) {
          this.memory.set(id, this.removeSchemaAttributes(s)[1]);
        }
      }
    }
  }

  private removeSchemaAttributes(
    schema: SchemaMergedWithId<Schema>,
  ): [SchemaId, Schema] {
    const { ['_id']: id, ...rest } = schema;

    return [id, rest as Schema];
  }
}
