import { ModalFormComponentResponse } from '@inmine/common/types/forms';

import { IModalFormComponent } from './modal-form-component';

export interface IToggleComponent extends IModalFormComponent {
  get result(): boolean | undefined;
  set result(value: ModalFormComponentResponse);
}
