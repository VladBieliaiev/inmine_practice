import { ModalFormComponentResponse } from '@inmine/common/types/forms';

import { IModalFormComponent } from './modal-form-component';

export interface ISliderComponent extends IModalFormComponent {
  get result(): number | undefined;
  set result(value: ModalFormComponentResponse);
}
