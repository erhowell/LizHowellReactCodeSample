/// <summary>
/// Returns a boolean which indicates whether a string is null, undefined, or empty
/// </summary>
export const isEmptyOrWhiteSpace = (str: string | undefined | null): boolean =>
  typeof str === "undefined" || str === null || /^\s*$/.test(str);
