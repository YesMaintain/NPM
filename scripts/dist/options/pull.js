import * as o from "fs";
import { resolve as e, dirname as t } from "path";
import { fileURLToPath as r } from "url";
const l=r(import.meta.url),m=t(l),i=new Set([{path:"/workflows/",name:"pull.yml",workflow:async()=>new Set([(await o.promises.readFile(e(`${m}/../../src/templates/.github/workflows/pull.yml`),"utf-8")).toString()])}]);var n=i;export { n as default };

