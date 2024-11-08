export const camalize = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => {
    return letter.toUpperCase();
  });
};
