import{readFile as e}from"fs/promises";import{dirname as t,resolve as o}from"path";import{fileURLToPath as r}from"url";var l=new Set([{Path:"/workflows/",Name:"Node.yml",File:async()=>new Set([(await e(o(`${t(r(import.meta.url))}/../../Source/templates/.github/workflows/Node.yml`),"utf-8")).toString()])}]);export{l as default};
