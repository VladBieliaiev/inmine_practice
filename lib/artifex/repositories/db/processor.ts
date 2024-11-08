import { world } from '@minecraft/server';

export class DBProcessor<T extends { id: number; name: string }> {
  private _lastId: number;
  private _memory: { [key: string]: T | undefined };

  constructor(
    private readonly _name: string,
    private readonly _identifier?: string,
  ) {
    this._memory = {};
    this._lastId = 0;
    this.load();
  }

  public getAll() {
    return Object.values(this._memory);
  }

  public getById(id: string): T | undefined {
    return !(id in this._memory)
      ? undefined
      : this._memory[id] === undefined
        ? this.loadDataFromWorld(id)
        : undefined;
  }

  public create(schema: { name: string }) {
    const id = this._lastId++;
    this._memory[id] = { ...schema, id } as T;

    return id;
  }

  public update(id: string, schema: Partial<T>) {
    const data = this.getById(id);
    if (!data) return;
    this._memory[id] = { ...data, ...schema };
  }

  public delete(id: string) {
    this.findWorldPropertiesById(id).forEach((id) => {
      world.setDynamicProperty(`${id}`, undefined);
    });
    delete this._memory[id];
  }

  public save(id: string) {
    const data = JSON.stringify(this._memory[id]);

    if (data.length <= 8000) {
      world.setDynamicProperty(`${this._name}$${id}_0`, data);
    } else {
      (data.match(/.{1,8000}/g) || []).forEach((d, i) => {
        world.setDynamicProperty(`${this._name}$${id}_${i}`, d);
      });
    }
  }

  public clearAll() {
    this._memory = {};
    this.getWorldProperties().forEach((id) => {
      world.setDynamicProperty(id, undefined);
    });
  }

  private load() {
    this.getWorldProperties().forEach((id) => {
      const [propId, _] = id.split('$')[1].split('_').map(Number);

      if (this._lastId < propId) {
        this._lastId = propId;
      }

      this._memory[propId] = undefined;
    });
  }

  private loadDataFromWorld(id: string) {
    let stringifiedData = '';
    this.findWorldPropertiesById(id).forEach((id) => {
      const data = world.getDynamicProperty(id);
      if (data !== undefined && typeof data === 'string') {
        stringifiedData += data;
      }
    });

    try {
      const parsedData = JSON.parse(stringifiedData);

      if (this._identifier && this._identifier in parsedData) {
        this._memory[parsedData[this._identifier]] = parsedData;
      } else {
        this._memory[id] = parsedData;
      }

      return parsedData;
    } catch (error) {}
  }

  private findWorldPropertiesById(
    id: string,
  ): `${string}$${number}_${number}`[] {
    return this.getWorldProperties().filter((id) =>
      id.startsWith(`${this._name}$${id}`),
    );
  }

  private getWorldProperties() {
    // names: artifex:db$1_0
    return world
      .getDynamicPropertyIds()
      .filter((id) =>
        id.startsWith(this._name),
      ) as `${string}$${number}_${number}`[];
  }
}
