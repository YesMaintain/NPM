import*as a from"fs";import{constants as m}from"fs/promises";import{dirname as d}from"path";import w from"../lib/git-directories.js";import $ from"../lib/package-types.js";import u from"../lib/packages.js";import y from"../options/dependabot.js";const g=async p=>{for(const{path:o,name:t,workflow:f}of p)for(const[c,l]of await w(await u())){const e=`${c}/.github`,i=await f();if(o==="/")for(const s of l){const n=d(s).replace(c,""),r=(await $()).get(s.split("/").pop());i.add(`
    - package-ecosystem: "${typeof r<"u"?r:(()=>{switch(s.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${n||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof r<"u"?(()=>{switch(r){case"cargo":return"lockfile-only";default:return"increase"}})():"increase"}
`)}if(i.size>0){try{await a.promises.mkdir(`${e}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${e}${o}`)}try{await a.promises.writeFile(`${e}${o}${t}`,`${[...i].join("")}`)}catch{console.log(`Could not create workflow for: ${e}/dependabot.yml`)}}else try{await a.promises.access(`${e}${o}${t}`,m.F_OK);try{await a.promises.rm(`${e}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${e}`)}}catch{}}};var D=async()=>{await g(y)};export{D as default};
