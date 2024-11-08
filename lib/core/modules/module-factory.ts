import { world } from '@minecraft/server';

import { InMineEventListenerInterface } from '@inmine/common/interfaces/events/event-listener';
import {
  InMineBaseModuleRef,
  InMineModuleMetaData,
} from '@inmine/common/types/core/modules';

export class InMineModuleFactory {
  private static registeredModules: Set<string> = new Set();
  // @TODO: refactor using Listeners storage
  private static registeredListeners: Set<InMineEventListenerInterface> =
    new Set();

  private static afterWorldLoadModules: Set<InMineBaseModuleRef> = new Set();

  public static register(module: InMineBaseModuleRef) {
    this.create(module);

    if (this.afterWorldLoadModules.size) {
      const worldInit = world.afterEvents.worldInitialize.subscribe(() => {
        this.afterWorldLoadModules.forEach((moduleName) => {
          this.create(moduleName as InMineBaseModuleRef, true);
        });
        this.afterWorldLoadModules.clear();

        this.registerListeners();
        world.afterEvents.worldInitialize.unsubscribe(worldInit);
      });
    }

    this.registerListeners();
  }

  private static create(
    module: InMineBaseModuleRef,
    worldLoaded: boolean = false,
  ) {
    const metadata = new module().register();
    const moduleName = module.name;

    if (this.registeredModules.has(moduleName)) {
      return;
    }

    if (metadata) {
      if (!worldLoaded && metadata.registerAfterWorldLoad) {
        if (!this.afterWorldLoadModules.has(module)) {
          this.afterWorldLoadModules.add(module);
        }
        return;
      }
      this.parseMetadata(metadata);
      this.registeredModules.add(moduleName);
    }
  }

  private static registerListeners() {
    this.registeredListeners.forEach((listener) => {
      listener.listen();
    });
    this.registeredListeners.clear();
  }

  private static parseMetadata(metadata: InMineModuleMetaData) {
    if (metadata.registerActions) {
      for (const action of metadata.registerActions) {
        action();
      }
    }

    if (metadata.dependencies && metadata.dependencies.length) {
      metadata.dependencies.forEach((dependency) => {
        this.create(dependency);
      });
    }

    if (metadata.listeners && metadata.listeners.length) {
      metadata.listeners.forEach((listener) => {
        this.registeredListeners.add(listener);
      });
    }
  }
}
