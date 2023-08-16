import{constants as m}from"fs";import{access as p,writeFile as $,mkdir as d,rm as u}from"fs/promises";import{dirname as w}from"path";import y from"../Library/Directory.ts";import g from"../Library/Package.ts";import k from"../Library/Type.ts";import h from"../Option/Dependabot.js";const v=async c=>{for(const{Path:o,Name:e,Flow:l}of c)for(const[s,f]of await y(await g())){const t=`${s}/.github`,r=await l();if(o==="/")for(const i of f){const n=w(i).replace(s,""),a=(await k()).get(i.split("/").pop());r.add(`
    - package-ecosystem: "${typeof a<"u"?a:(()=>{switch(i.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${n||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof a<"u"?(()=>{switch(a){case"cargo":return"lockfile-only";default:return"increase"}})():"increase"}
`)}if(r.size>0){try{await d(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await $(`${t}${o}${e}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/dependabot.yml`)}}else try{await p(`${t}${o}${e}`,m.F_OK);try{await u(`${t}${o}${e}`)}catch{console.log(`Could not remove ${o}${e} for: ${t}`)}}catch{}}};var O=async()=>await v(h);export{O as default};
