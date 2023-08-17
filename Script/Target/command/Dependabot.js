import{constants as m}from"fs";import{access as p,writeFile as $,mkdir as d,rm as u}from"fs/promises";import{dirname as w}from"path";import y from"../Library/Directory.ts";import g from"../Library/Package.ts";import k from"../Library/Type.ts";import h from"../Option/Dependabot.js";const v=async n=>{for(const{Path:o,Name:t,File:l}of n)for(const[s,f]of await y(await g())){const e=`${s}/.github`,r=await l();if(o==="/")for(const i of f){const c=w(i).replace(s,""),a=(await k()).get(i.split("/").pop());r.add(`
    - package-ecosystem: "${typeof a<"u"?a:(()=>{switch(i.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${c||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof a<"u"?(()=>{switch(a){case"cargo":return"lockfile-only";default:return"increase"}})():"increase"}
`)}if(r.size>0){try{await d(`${e}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${e}${o}`)}try{await $(`${e}${o}${t}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${e}/dependabot.yml`)}}else try{await p(`${e}${o}${t}`,m.F_OK);try{await u(`${e}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${e}`)}}catch{}}};var x=async()=>await v(h);export{x as default};
