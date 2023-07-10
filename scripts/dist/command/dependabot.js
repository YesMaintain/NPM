import{access as l,mkdir as m,rm as d,writeFile as w}from"fs/promises";import $ from"../lib/git-directories.js";import u from"../lib/package-types.js";import y from"../options/dependabot.js";import g from"../lib/packages.js";import{dirname as k}from"path";import{constants as h}from"fs";const v=async s=>{for(const{path:o,name:e,workflow:p}of s)for(const[c,f]of await $(await g())){const t=`${c}/.github`,a=await p();if(o==="/")for(const i of f){const n=k(i).replace(c,""),r=(await u()).get(i.split("/").pop());a.add(`
    - package-ecosystem: "${typeof r<"u"?r:(()=>{switch(i.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${n||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof r<"u"?(()=>{switch(r){case"cargo":return"lockfile-only";default:return"increase"}})():"increase"}
`)}if(a.size>0){try{await m(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await w(`${t}${o}${e}`,`${[...a].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/dependabot.yml`)}}else try{await l(`${t}${o}${e}`,h.F_OK);try{await d(`${t}${o}${e}`)}catch{console.log(`Could not remove ${o}${e} for: ${t}`)}}catch{}}};var z=async()=>{await v(y)};export{z as default};
