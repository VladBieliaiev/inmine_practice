import { SpiralLocationIteratorData } from '@inmine/common/types';

export class SpiralLocationIterator {
  private lastIteration: number = 1;
  private x: number = 0;
  private z: number = 0;
  private side: number = 0;
  private sideLength: number = 1;
  private step: number = 1;

  constructor(distance: number, data?: SpiralLocationIteratorData) {
    if (!data) {
      return this;
    }
    this.lastIteration = data.lastIteration;
    this.x = data.x;
    this.z = data.z;
    this.side = data.side;
    this.sideLength = data.sideLength;
    if (distance) {
      this.step = distance;
    }
  }

  next() {
    if (this.lastIteration > 1) {
      if (this.lastIteration % this.sideLength === 0) {
        this.side = (this.side + 1) % 4;

        if (this.side % 2 === 0) {
          this.sideLength++;
        }
      }

      switch (this.side) {
        case 0:
          this.z++;
          break;
        case 1:
          this.x++;
          break;
        case 2:
          this.z--;
          break;
        case 3:
          this.x--;
          break;
      }
    }
    this.lastIteration++;

    return this.data;
  }

  get data() {
    return {
      section: [this.x * this.step, this.z * this.step] as [number, number],
      record: {
        lastIteration: this.lastIteration,
        x: this.x,
        z: this.z,
        side: this.side,
        sideLength: this.sideLength,
      },
    };
  }
}
