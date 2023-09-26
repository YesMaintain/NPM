import { config } from "dotenv";
import { cwd } from "process";
import { z } from "zod";
config();
var Environment_default = z.object({
  User: z.string().default(""),
  Base: z.string().default(cwd()),
  Token: z.string().default("")
}).parse(process.env);
export {
  Environment_default as default
};
