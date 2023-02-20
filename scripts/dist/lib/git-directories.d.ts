/**
 * It takes a set of globs, and returns a map of git directories to the globs that were found in them
 * @param globs - Set<string>
 * @returns A map of git directories to a set of globs.
 */
declare const gitDirectories: (globs: Set<string>) => Promise<Map<any, any>>;
export default gitDirectories;
