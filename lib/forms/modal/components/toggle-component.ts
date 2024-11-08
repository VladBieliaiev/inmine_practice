import { IToggleComponent } from '@inmine/common/interfaces/forms';
import {
  ComponentTextInput,
  ModalFormComponentResponse,
} from '@inmine/common/types/forms';
import { ModalFormData } from '@minecraft/server-ui';

export class ToggleComponent implements IToggleComponent {
  protected _result: boolean | undefined;
  constructor(
    protected readonly label: ComponentTextInput,
    protected readonly defaultValue: boolean = false,
  ) {}

  get result(): boolean | undefined {
    return this._result;
  }

  set result(value: ModalFormComponentResponse) {
    if (typeof value === 'boolean' && value !== this._result) {
      this._result = value;
    } else {
      this._result = undefined;
    }
  }

  apply(form: ModalFormData): ModalFormData {
    return form.toggle(this.label, this.defaultValue);
  }
}
