/**
 * It returns a map of file names to package managers
 * @returns A map of package managers and their configuration files.
 */
declare const packageTypes: () => Promise<Map<string, string>>;
export default packageTypes;
