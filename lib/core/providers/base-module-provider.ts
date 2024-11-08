import { InMineAbstractModule } from '../modules/base-module';

export abstract class InMineAbstractModuleProvider {
  protected static _module: InMineAbstractModule;
  public static get module() {
    return this._module;
  }
  public static set module(module: InMineAbstractModule) {
    if (!this._module) {
      this._module = module;
    }
  }
}
