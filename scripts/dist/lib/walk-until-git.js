import * as o from "fs";
import { dirname as a } from "path";
const s=async(i,n)=>{const t=a(i),r=n||t;return t===i?r:o.existsSync(`${t}/.git`)?t:await s(t,r)};var f=s;export { f as default };

