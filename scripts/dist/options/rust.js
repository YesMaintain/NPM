import{readFile as t}from"fs/promises";import{dirname as o,resolve as r}from"path";import{fileURLToPath as e}from"url";const i=e(import.meta.url),m=o(i);var f=new Set([{path:"/workflows/",name:"rust.yml",workflow:async()=>new Set([(await t(r(`${m}/../../src/templates/.github/workflows/rust.yml`),"utf-8")).toString()])}]);export{f as default};
