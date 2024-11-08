import { IDropdownComponent } from '@inmine/common/interfaces/forms/components/dropdown-component';
import { ComponentTextInput } from '@inmine/common/types/forms';
import { ModalFormData } from '@minecraft/server-ui';

import { ModalFormComponentResponse } from '../../../common/types/forms/modal-form-response';

export class DropdownComponent implements IDropdownComponent {
  protected _result: number | undefined;

  constructor(
    protected readonly label: ComponentTextInput,
    protected readonly options: ComponentTextInput[],
    protected readonly defaultValue: number = 0,
  ) {}

  get resultIndex(): number | undefined {
    return this._result;
  }

  /**
   * Get the result of the dropdown component.
   * @note Returns undefined if the result does not change.
   */
  get result(): ComponentTextInput | undefined {
    return this._result !== undefined ? this.options[this._result] : undefined;
  }

  set result(value: ModalFormComponentResponse) {
    if (
      typeof value === 'number' &&
      value !== this._result &&
      value < this.options.length &&
      value >= 0
    ) {
      this._result = value;
    } else {
      this._result = undefined;
    }
  }

  apply(form: ModalFormData): ModalFormData {
    return form.dropdown(this.label, this.options, this.defaultValue);
  }
}
