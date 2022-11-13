/**
 * It enables all the security features for all the repositories in the organization
 * @param {string[] | Set<string>} repositories - string[] | Set<string> = []
 */
declare const edit: (repositories?: string[] | Set<string>) => Promise<void>;
export default edit;
