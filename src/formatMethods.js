export function capitalizeFirstLetter(string) {
  let result = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  result = result.replace(/(-)(\S)/g, (s) => s.toUpperCase());

  return result;
}
