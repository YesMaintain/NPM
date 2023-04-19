import{access as l,constants as m,mkdir as d,rm as w,writeFile as $}from"fs/promises";import{dirname as u}from"path";import y from"../lib/git-directories.js";import g from"../lib/package-types.js";import k from"../lib/packages.js";import h from"../options/dependabot.js";const v=async s=>{for(const{path:o,name:e,workflow:p}of s)for(const[c,f]of await y(await k())){const t=`${c}/.github`,a=await p();if(o==="/")for(const i of f){const n=u(i).replace(c,""),r=(await g()).get(i.split("/").pop());a.add(`
    - package-ecosystem: "${typeof r<"u"?r:(()=>{switch(i.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${n||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof r<"u"?(()=>{switch(r){case"cargo":return"lockfile-only";default:return"increase"}})():"increase"}
`)}if(a.size>0){try{await d(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await $(`${t}${o}${e}`,`${[...a].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/dependabot.yml`)}}else try{await l(`${t}${o}${e}`,m.F_OK);try{await w(`${t}${o}${e}`)}catch{console.log(`Could not remove ${o}${e} for: ${t}`)}}catch{}}};var x=async()=>{await v(h)};export{x as default};
