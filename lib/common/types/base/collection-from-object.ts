export type CollectionFromObjects<Ids extends Record<any, any>> = {
  [Id in keyof Ids]: Ids[Id];
};
