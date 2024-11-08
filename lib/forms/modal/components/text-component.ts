import { ITextComponent } from '@inmine/common/interfaces/forms';
import {
  ComponentTextInput,
  ModalFormComponentResponse,
} from '@inmine/common/types/forms';
import { ModalFormData } from '@minecraft/server-ui';

export class TextComponent implements ITextComponent {
  protected _result: string | undefined;
  constructor(
    protected readonly label: ComponentTextInput,
    protected readonly placeholderText: ComponentTextInput,
    protected readonly defaultValue: string = '',
  ) {}

  get result(): string | undefined {
    return this._result;
  }

  set result(value: ModalFormComponentResponse) {
    if (typeof value === 'string' && value !== this._result) {
      this._result = value;
    } else {
      this._result = undefined;
    }
  }

  apply(form: ModalFormData): ModalFormData {
    return form.textField(this.label, this.placeholderText, this.defaultValue);
  }
}
