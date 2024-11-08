import { FormButton } from '@inmine/common/interfaces/forms/form-button';
import { FormButtonViewData } from '@inmine/common/types/forms/form-button-view-data';

export class ConfirmButton implements FormButton {
  constructor() {}

  click(): void {
    console.log('Confirm button clicked');
  }
  render(): FormButtonViewData | undefined {
    return {
      text: 'Confirm',
    };
  }
}
