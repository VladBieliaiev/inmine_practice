export const stringAdvancedMatches = (
  str: string,
  pattern: string,
): boolean => {
  const regex = new RegExp(`^${pattern.split('*').join('.*')}$`);

  return regex.test(str);
};
