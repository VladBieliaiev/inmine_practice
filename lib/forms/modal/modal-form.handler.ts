import { Player } from '@minecraft/server';

import { ModalFormData } from '@minecraft/server-ui';

import { FormHandler } from '../../common/interfaces/forms/form-handler';
import { ModalFormComponent } from '../../common/types/forms/modal-form-component';

export class ModalFormHandler implements FormHandler {
  constructor(
    private readonly form: ModalFormData,
    private readonly components: ModalFormComponent[],
    private readonly cancelAction?: () => void,
    private readonly closeAction?: () => void,
  ) {}

  async open(player: Player): Promise<boolean> {
    const response = await this.form.show(player);
    if (
      response.canceled ||
      response.formValues === undefined ||
      response.formValues.length === 0
    ) {
      if (this.cancelAction) {
        this.cancelAction();
      }
      return false;
    }

    for (let i = 0; i < this.components.length; i++) {
      this.components[i].result = response.formValues[i];
    }

    if (this.closeAction) {
      this.closeAction();
    }

    return true;
  }
}
