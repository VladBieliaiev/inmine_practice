export type OneOrMany<T> = T extends Array<infer U> ? U : T;
