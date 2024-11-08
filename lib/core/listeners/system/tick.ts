import { System, system } from '@minecraft/server';

import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { SystemTickAfterEvent } from '@inmine/common/types/events/core';

export class SystemTickAfterListener {
  private eventRef: number | undefined;
  private signal: System = system;
  private every: number;
  private pipe: InMineEventPipe<SystemTickAfterEvent | undefined>;
  private tickCountRequired: boolean;

  constructor(
    pipe: InMineEventPipe<SystemTickAfterEvent>,
    every: number,
    tickCountRequired: boolean = false,
  ) {
    this.every = every;
    this.pipe = pipe;
    this.tickCountRequired = tickCountRequired;
  }

  private call(): number {
    return this.signal.runInterval(
      this.tickCountRequired
        ? () => {
            this.pipe.execute({
              tick: system.currentTick,
            });
          }
        : () => {
            this.pipe.execute(undefined);
          },
      this.every,
    );
  }

  public listen(): void {
    this.eventRef = this.call();
  }
  public mute(): void {
    if (this.eventRef) {
      this.signal.clearRun(this.eventRef);
    }
  }

  public setPipe(
    pipe: InMineEventPipe<SystemTickAfterEvent>,
  ): SystemTickAfterListener {
    this.pipe = pipe;

    return this;
  }
}
