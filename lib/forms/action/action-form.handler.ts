import { Player } from '@minecraft/server';

import { ActionFormData } from '@minecraft/server-ui';

import { FormButton } from '../../common/interfaces/forms/form-button';
import { FormHandler } from '../../common/interfaces/forms/form-handler';

export class ActionFormHandler implements FormHandler {
  constructor(
    private readonly form: ActionFormData,
    private readonly buttons: FormButton[],
    private readonly cancelAction?: () => void,
    private readonly closeAction?: () => void,
  ) {}

  async open(player: Player): Promise<boolean> {
    const response = await this.form.show(player);
    if (response.canceled || response.selection === undefined) {
      if (this.cancelAction) {
        this.cancelAction();
      }
      return false;
    }

    this.buttons[response.selection].click();
    if (this.closeAction) {
      this.closeAction();
    }

    return true;
  }
}
