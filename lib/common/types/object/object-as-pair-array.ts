export type ObjectAsPairArray<T extends Record<string, any>> = [
  keyof T,
  T[keyof T],
][];
