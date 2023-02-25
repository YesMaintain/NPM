import * as o from "fs";
import { resolve as r, dirname as t } from "path";
import { fileURLToPath as e } from "url";
const s=e(import.meta.url),m=t(s),i=new Set([{path:"/workflows/",name:"rust.yml",workflow:async()=>new Set([(await o.promises.readFile(r(`${m}/../../src/templates/.github/workflows/rust.yml`),"utf-8")).toString()])}]);var f=i;export { f as default };

