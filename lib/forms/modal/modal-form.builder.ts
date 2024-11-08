import { RawMessage } from '@minecraft/server';

import { ModalFormData } from '@minecraft/server-ui';

import { ModalFormHandler } from './modal-form.handler';
import { ModalFormComponent } from '../../common/types/forms/modal-form-component';

export class ModalFormBuilder {
  private readonly form: ModalFormData = new ModalFormData();
  private readonly components: ModalFormComponent[] = [];
  private cancelAction?: () => void;
  private closeAction?: () => void;

  title(title: string | RawMessage): ModalFormBuilder {
    this.form.title(title);

    return this;
  }

  component(component: ModalFormComponent): ModalFormBuilder {
    this.components.push(component);

    return this;
  }

  onCancel(action: () => void): ModalFormBuilder {
    this.cancelAction = action;

    return this;
  }

  onClose(action: () => void): ModalFormBuilder {
    this.closeAction = action;

    return this;
  }

  build(): ModalFormHandler {
    this.components.forEach((component) => {
      component.apply(this.form);
    });

    return new ModalFormHandler(
      this.form,
      this.components,
      this.cancelAction,
      this.closeAction,
    );
  }
}
