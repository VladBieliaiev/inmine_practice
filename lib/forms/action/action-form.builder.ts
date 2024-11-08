import { RawMessage } from '@minecraft/server';

import { ActionFormData } from '@minecraft/server-ui';

import { ActionFormHandler } from './action-form.handler';
import { FormButton } from '../../common/interfaces/forms/form-button';

export class ActionFormBuilder {
  private readonly form: ActionFormData = new ActionFormData();
  private readonly buttons: FormButton[] = [];
  private cancelAction?: () => void;
  private closeAction?: () => void;

  title(title: string | RawMessage): ActionFormBuilder {
    this.form.title(title);

    return this;
  }

  body(body: string | RawMessage): ActionFormBuilder {
    this.form.body(body);

    return this;
  }

  button(button: FormButton): ActionFormBuilder {
    this.buttons.push(button);

    return this;
  }

  onCancel(action: () => void): ActionFormBuilder {
    this.cancelAction = action;

    return this;
  }

  onClose(action: () => void): ActionFormBuilder {
    this.closeAction = action;

    return this;
  }

  build(): ActionFormHandler {
    const buttons: FormButton[] = this.buttons;
    this.buttons
      .map((button) => button.render())
      .filter((viewData) => viewData !== undefined)
      .forEach((viewData) => {
        this.form.button(viewData!.text, viewData!.iconPath);
      });

    return new ActionFormHandler(
      this.form,
      buttons,
      this.cancelAction,
      this.closeAction,
    );
  }
}
