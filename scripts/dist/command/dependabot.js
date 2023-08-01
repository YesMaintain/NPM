import{constants as l}from"fs";import{access as m,mkdir as d,rm as $,writeFile as w}from"fs/promises";import{dirname as u}from"path";import y from"../lib/GitDirectories.js";import g from"../lib/PackageTypes.js";import k from"../lib/Packages.js";import h from"../options/Dependabot.js";const v=async s=>{for(const{path:o,name:e,workflow:p}of s)for(const[c,f]of await y(await k())){const t=`${c}/.github`,a=await p();if(o==="/")for(const i of f){const n=u(i).replace(c,""),r=(await g()).get(i.split("/").pop());a.add(`
    - package-ecosystem: "${typeof r<"u"?r:(()=>{switch(i.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${n||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof r<"u"?(()=>{switch(r){case"cargo":return"lockfile-only";default:return"increase"}})():"increase"}
`)}if(a.size>0){try{await d(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await w(`${t}${o}${e}`,`${[...a].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/dependabot.yml`)}}else try{await m(`${t}${o}${e}`,l.F_OK);try{await $(`${t}${o}${e}`)}catch{console.log(`Could not remove ${o}${e} for: ${t}`)}}catch{}}};var x=async()=>{await v(h)};export{x as default};
