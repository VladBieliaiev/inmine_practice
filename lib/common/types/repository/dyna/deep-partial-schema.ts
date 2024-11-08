export type DeepPartialDynaSchema<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartialDynaSchema<T[P]> : T[P];
};
