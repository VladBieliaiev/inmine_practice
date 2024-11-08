/**
 * @returns Array of numbers.
 */
export const listNumbers = (
  to: number,
  from: number = 0,
  every: number = 1,
): number[] => {
  if (to <= 0) {
    return [];
  }
  const numbersList = [];
  for (let i = from; i <= to; i += every) {
    numbersList.push(i);
  }

  return numbersList;
};
