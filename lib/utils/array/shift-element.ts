/**
 * @returns Shifts element in array.
 */
export const shiftElement = <T>(array: T[], element: T, to: number): T[] => {
  if (!array.length) {
    return [];
  }
  const currentIndex = array.indexOf(element);
  if (currentIndex !== -1) {
    array.splice(to, 0, array.splice(currentIndex, 1)[0]);
  }
  return array;
};
