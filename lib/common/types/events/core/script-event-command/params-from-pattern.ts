export type ParamsFromPattern<Pattern extends string> =
  Pattern extends `${string}/${infer Rest}`
    ? { [K in PatternParamKey<Pattern>]: string } & ParamsFromPattern<Rest>
    : Pattern extends `${infer LastParam}`
      ? { [K in PatternParamKey<LastParam>]: string }
      : object;

export type PatternParamKey<T> = T extends `:${infer Key}/${string}`
  ? Key
  : T extends `:${infer Key}`
    ? Key extends ''
      ? never
      : Key
    : never;
