import FastGlob from "fast-glob";
import env from "./env.js";

/**
 * It returns a set of all the directories that contain a package.json file
 */
const packages = async () => {
	return new Set<string>(
		[
			...(await FastGlob(["**/README.md"], {
				absolute: true,
				cwd: env.BASE_DIR,
			})),
		].sort()
	);
};

export default packages;
