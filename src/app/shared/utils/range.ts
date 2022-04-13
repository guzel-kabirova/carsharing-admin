export function range(min: number, max: number): number[] {
  const result = [];
  for (let i = min; i < max - min; i++) {
    result.push(i);
  }

  return result;
}
