/**
 * It gets all the repositories of the user and dispatches all the workflows of the repositories
 * @param {string[] | Set<string>} repositories - string[] | Set<string> = []
 */
declare const dispatch: (repositories?: string[] | Set<string>) => Promise<void>;
export default dispatch;
