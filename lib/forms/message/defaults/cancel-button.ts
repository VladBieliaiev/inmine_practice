import { FormButton } from '@inmine/common/interfaces/forms/form-button';
import { FormButtonViewData } from '@inmine/common/types/forms/form-button-view-data';

export class CancelButton implements FormButton {
  constructor() {}

  click(): void {
    console.log('Cancel button clicked');
  }
  render(): FormButtonViewData | undefined {
    return {
      text: 'Cancel',
    };
  }
}
