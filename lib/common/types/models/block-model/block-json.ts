export type BlockJson = {
  identifier: string;
  states?: {
    [key: string]: boolean[] | string[] | number[];
  };
};
