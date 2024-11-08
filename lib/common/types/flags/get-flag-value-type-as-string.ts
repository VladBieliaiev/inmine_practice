import { FlagValueTypes } from './flag-value-types';

export type GetFlagValueTypeId<T extends FlagValueTypes> = T extends object
  ? 'object'
  : T extends number
    ? 'number'
    : T extends string
      ? string
      : T extends boolean
        ? 'boolean'
        : undefined;
