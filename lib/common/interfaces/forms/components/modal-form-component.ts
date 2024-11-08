import { ModalFormData } from '@minecraft/server-ui';

export interface IModalFormComponent {
  apply(form: ModalFormData): ModalFormData;
}
