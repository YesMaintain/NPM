/**
 * It deletes all GitHub Actions logs and runs for all of your repositories
 */
declare const clean: (repositories?: string[]) => Promise<void>;
export default clean;
