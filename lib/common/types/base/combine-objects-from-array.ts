export type CombineObjectsFromArray<T extends Record<string, any>[]> =
  T extends [infer F, ...infer Rest]
    ? Rest extends Record<string, any>[]
      ? F & CombineObjectsFromArray<Rest>
      : object
    : object;
