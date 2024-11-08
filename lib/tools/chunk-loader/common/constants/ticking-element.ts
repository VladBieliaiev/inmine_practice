import { commonNamespace } from '@inmine/common/constants/name/common-namespace';
import { NameUtils } from '@inmine/utils/name';

export const tickingElementName = 'ticking_element';

export const tickingElementIdentifier = NameUtils.concatWithNamespace(
  commonNamespace,
  tickingElementName,
);
