import a from "fast-glob";
import * as c from "fs";
import p from "../lib/env.js";
import i from "../lib/star-repository.js";
const d=async()=>{const s=new Set,r=await a(["**/package.json","!**/node_modules"],{absolute:!0,cwd:p.BASE_DIR});for(const t of r){const e=JSON.parse((await c.promises.readFile(t,"utf-8")).toString());for(const o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&(o==="dependencies"||o==="devDependencies"))for(const n in e[o])Object.prototype.hasOwnProperty.call(e[o],n)&&s.add(n)}for(const t of s){const e=await(await fetch(`https://registry.npmjs.org/${t}`)).json();e.repository?.url&&i(e.repository.url)}};var y=d;export { y as default };

