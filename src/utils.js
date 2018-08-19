export function titleCase(str) {
  const result = str || '';
  return result[0].toUpperCase() + result.slice(1);
}
