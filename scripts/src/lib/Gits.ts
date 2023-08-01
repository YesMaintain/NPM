import FastGlob from "fast-glob";
import env from "./Env.js";

export default async () =>
	new Set<string>(
		[
			...(await FastGlob(["**/.git"], {
				absolute: true,
				cwd: env.BASE_DIR,
			})),
		].sort()
	);
