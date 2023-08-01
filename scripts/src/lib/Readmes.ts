import FastGlob from "fast-glob";
import env from "./Env.js";

export default async () =>
	new Set<string>(
		[
			...(await FastGlob(["**/README.md"], {
				absolute: true,
				cwd: env.BASE_DIR,
			})),
		].sort()
	);
