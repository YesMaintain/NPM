import FastGlob from "fast-glob";
import env from "./env.js";

export default async () =>
	new Set<string>(
		[
			...(await FastGlob(["**/.git"], {
				absolute: true,
				cwd: env.BASE_DIR,
			})),
		].sort()
	);
