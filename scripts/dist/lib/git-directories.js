import i from "./walk-until-git.js";
const o=async r=>{const t=new Map;for(const s of r){const e=await i(s);t.has(e)?t.set(e,t.get(e).add(s)):t.set(e,new Set([s].sort()))}return t};var a=o;export { a as default };

