import * as o from "fs";
import { dirname as e, resolve as t } from "path";
import { fileURLToPath as r } from "url";
const m=r(import.meta.url),i=e(m),n=new Set([{path:"/workflows/",name:"node.yml",workflow:async()=>new Set([(await o.promises.readFile(t(`${i}/../../src/templates/.github/workflows/node.yml`),"utf-8")).toString()])}]);var f=n;export { f as default };

