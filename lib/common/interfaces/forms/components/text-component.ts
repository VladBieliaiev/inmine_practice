import { ModalFormComponentResponse } from '@inmine/common/types/forms';

import { IModalFormComponent } from './modal-form-component';

export interface ITextComponent extends IModalFormComponent {
  get result(): string | undefined;
  set result(value: ModalFormComponentResponse);
}
