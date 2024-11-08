export const snakerize = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, '_');
};
