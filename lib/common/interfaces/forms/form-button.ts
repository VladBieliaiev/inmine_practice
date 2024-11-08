import { FormButtonViewData } from '../../types/forms/form-button-view-data';

export interface FormButton {
  click(): void;
  render(): FormButtonViewData | undefined;
}
