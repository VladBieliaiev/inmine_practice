import { ArtifexLogger } from '@inmine/artifex/tools/logger/logger';
import { Identifier } from '@inmine/common';
import { Namespace } from '@inmine/artifex/common/types/name/namespace';

export class ArtifexEnv {
  protected static _namespace: Namespace = 'inmine_common';
  public static set namespace(namespace: Namespace) {
    this._namespace = namespace;
  }
  public static get namespace() {
    return this._namespace;
  }

  public static createIdentifier<T extends string>(id: T): Identifier {
    return `${this.namespace}:${id}`;
  }

  protected static _debug = false;
  public static set debug(debug: boolean) {
    this._debug = debug;
  }
  public static get debug() {
    return this._debug;
  }

  public static get logger() {
    return ArtifexLogger;
  }
}
