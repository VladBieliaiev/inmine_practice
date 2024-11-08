import { InMineBaseService } from '@inmine/common/interfaces/modules/core';

export abstract class InMineAbstractServiceProvider {
  protected static _service: InMineBaseService;
  public static get service() {
    return this._service;
  }
  public static set service(serv: InMineBaseService) {
    this._service = serv;
  }
}
