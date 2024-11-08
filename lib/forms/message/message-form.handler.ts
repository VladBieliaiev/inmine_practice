import { Player } from '@minecraft/server';

import { MessageFormData } from '@minecraft/server-ui';

import { FormButton } from '../../common/interfaces/forms/form-button';
import { FormHandler } from '../../common/interfaces/forms/form-handler';

export class MessageFormHandler implements FormHandler {
  constructor(
    private readonly form: MessageFormData,
    private readonly buttons: FormButton[],
    private readonly cancelAction?: () => void,
    private readonly closeAction?: () => void,
  ) {}

  async open(player: Player) {
    const response = await this.form.show(player);
    if (response.canceled || response.selection === undefined) {
      if (this.cancelAction !== undefined) {
        this.cancelAction();
      }
      return false;
    }

    this.buttons[response.selection].click();
    if (this.closeAction !== undefined) {
      this.closeAction();
    }

    return true;
  }
}
