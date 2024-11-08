import { MessageFormData } from '@minecraft/server-ui';

import { CancelButton } from './defaults/cancel-button';
import { MessageFormHandler } from './message-form.handler';
import { FormButton } from '../../common/interfaces/forms/form-button';

export class MessageFormBuilder {
  private readonly form: MessageFormData = new MessageFormData();
  private _button1: FormButton | undefined;
  private _button2: FormButton | undefined;
  private cancelAction?: () => void;
  private closeAction?: () => void;

  title(title: string): MessageFormBuilder {
    this.form.title(title);

    return this;
  }

  body(body: string): MessageFormBuilder {
    this.form.body(body);

    return this;
  }

  button1(button: FormButton): MessageFormBuilder {
    this._button2 = button;

    return this;
  }
  button2(button: FormButton): MessageFormBuilder {
    this._button1 = button;

    return this;
  }

  onCancel(action: () => void): MessageFormBuilder {
    this.cancelAction = action;

    return this;
  }

  onClose(action: () => void): MessageFormBuilder {
    this.closeAction = action;

    return this;
  }

  build(): MessageFormHandler {
    if (this._button1 === undefined) {
      this._button1 = new CancelButton();
    }
    if (this._button2 === undefined) {
      this._button2 = new CancelButton();
    }
    this.form.button1(this._button1.render()!.text);
    this.form.button2(this._button2.render()!.text);

    return new MessageFormHandler(
      this.form,
      [this._button1, this._button2],
      this.cancelAction,
      this.closeAction,
    );
  }
}
