import {
  ComponentTextInput,
  ModalFormComponentResponse,
} from '@inmine/common/types/forms';

import { IModalFormComponent } from './modal-form-component';

export interface IDropdownComponent extends IModalFormComponent {
  get result(): ComponentTextInput | undefined;
  set result(value: ModalFormComponentResponse);
}
