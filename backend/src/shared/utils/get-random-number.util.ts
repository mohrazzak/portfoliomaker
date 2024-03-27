/**
 * Generates a random number with the specified length.
 *
 * @param length - The desired length of the generated number.
 * @returns A random number with the specified length.
 */
export function getRandomNumber(length: number): string {
  if (length <= 0) {
    throw new Error('Length must be greater than 0.');
  }

  const min = Math.pow(10, length - 1); // Minimum number with the specified length
  const max = Math.pow(10, length) - 1; // Maximum number with the specified length

  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}
