import r from "dotenv";
import { cwd as o } from "process";
import { z as t } from "zod";
r.config();var d=t.object({GITHUB_USER:t.string().default(""),BASE_DIR:t.string().default(o()),GITHUB_AUTH_TOKEN:t.string().default("")}).parse(process.env);export { d as default };

