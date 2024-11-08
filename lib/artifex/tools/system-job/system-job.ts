import { system } from '@minecraft/server';

export class SystemJob<T> {
  private _jobId: number;

  constructor(
    private readonly action: (resolve: (value: T) => void) => Generator<any>,
  ) {
    this._jobId = -1;
  }

  public run(): Promise<T> {
    return new Promise<T>((resolve) => {
      this._jobId = system.runJob(this.action(resolve));
    });
  }

  public clear() {
    if (this._jobId !== -1) {
      system.clearJob(this._jobId);
    }
  }
}
