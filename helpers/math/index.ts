/**
 * Return greatest common divisor of two numbers.
 */
export function gcd(a: number, b: number): number {
  return a ? gcd(b % a, a) : b;
}

/**
 * Return lowest common multiple of two numbers.
 */
export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}
