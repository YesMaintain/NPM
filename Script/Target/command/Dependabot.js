import{constants as m}from"fs";import{access as p,writeFile as $,mkdir as d,rm as u}from"fs/promises";import{dirname as y}from"path";import w from"../Library/Directory.js";import g from"../Library/Package.js";import k from"../Library/Type.js";import h from"../Option/Dependabot.js";const F=async n=>{for(const{Path:e,Name:o,File:l}of n)for(const[s,f]of await w(await g())){const t=`${s}/.github`,r=await l();if(e==="/")for(const i of f){const c=y(i).replace(s,""),a=(await k()).get(i.split("/").pop());r.add(`
    - package-ecosystem: "${typeof a<"u"?a:(()=>{switch(i.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${c||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof a<"u"?(()=>{switch(a){case"Cargo":return"lockfile-only";default:return"increase"}})():"increase"}
`)}if(r.size>0){try{await d(`${t}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${e}`)}try{await $(`${t}${e}${o}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/dependabot.yml`)}}else try{await p(`${t}${e}${o}`,m.F_OK);try{await u(`${t}${e}${o}`)}catch{console.log(`Could not remove ${e}${o} for: ${t}`)}}catch{}}};var x=async()=>await F(h);export{x as default};
