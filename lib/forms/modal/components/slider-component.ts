import { ISliderComponent } from '@inmine/common/interfaces/forms/components';
import { ComponentTextInput } from '@inmine/common/types/forms';
import { ModalFormData } from '@minecraft/server-ui';

export class SliderComponent implements ISliderComponent {
  protected _result: number | undefined;

  constructor(
    protected readonly label: ComponentTextInput,
    protected readonly min: number,
    protected readonly max: number,
    protected readonly step: number = 1,
    protected readonly defaultValue: number = 0,
  ) {}

  get result(): number | undefined {
    return this._result;
  }
  set result(value: number) {
    if (
      typeof value === 'number' &&
      value !== this._result &&
      value >= this.min &&
      value <= this.max
    ) {
      this._result = value;
    } else {
      this._result = undefined;
    }
  }

  apply(form: ModalFormData): ModalFormData {
    return form.slider(
      this.label,
      this.min,
      this.max,
      this.step,
      this.defaultValue,
    );
  }
}
