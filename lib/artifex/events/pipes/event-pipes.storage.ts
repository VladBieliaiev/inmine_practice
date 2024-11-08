import { CreatableClass } from '@inmine/common';

import { ArtifexBaseEventPipe } from './base-event.pipe';

export class ArtifexEventPipesStorage {
  private static storage: Map<string, ArtifexBaseEventPipe<any>> = new Map();

  public static getOrCreate<Pipe extends ArtifexBaseEventPipe<any>>(
    pipe: CreatableClass<Pipe>,
  ): Pipe {
    return this.getByName(pipe) ?? this.add(pipe);
  }

  public static add<Pipe extends ArtifexBaseEventPipe<any>>(
    pipe: CreatableClass<Pipe>,
  ): Pipe {
    let instance: Pipe | undefined = this.storage.get(pipe.name) as Pipe;

    if (!instance) {
      instance = new pipe();
      this.storage.set(pipe.name, instance);
    }

    return instance;
  }

  public static getByName<Pipe extends ArtifexBaseEventPipe<any>>(
    pipe: CreatableClass<Pipe>,
  ): Pipe | undefined {
    return this.storage.get(pipe.name) as Pipe | undefined;
  }

  public static has<Pipe extends ArtifexBaseEventPipe<any>>(
    pipe: CreatableClass<Pipe>,
  ): boolean {
    return this.storage.has(pipe.name);
  }
}
