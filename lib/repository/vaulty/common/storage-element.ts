import { commonNamespace } from '@inmine/common/constants/name/common-namespace';
import { NameUtils } from '@inmine/utils/name';

export const storageElementName = 'storage_element';

export const storageElementIdentifier = NameUtils.concatWithNamespace(
  commonNamespace,
  storageElementName,
);
