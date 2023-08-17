import * as dotenv from "dotenv";
import { cwd } from "process";
import { z } from "zod";

dotenv.config();

export default z
	.object({
		User: z.string().default(""),
		Base: z.string().default(cwd()),
		GitHub: z.string().default(""),
	})
	.parse(process.env);
