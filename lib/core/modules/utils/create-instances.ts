import { CreatableClass } from '@inmine/common/types/base/creatable-class';

export const createInstances = (instances: CreatableClass<any>[]) => {
  for (const instance of instances) {
    new instance();
  }
};
