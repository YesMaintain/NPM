import{constants as m}from"fs";import{access as p,mkdir as $,rm as d,writeFile as u}from"fs/promises";import{dirname as w}from"path";import y from"../Library/Dirs.js";import g from"../Library/Types.js";import k from"../Library/Packages.js";import h from"../Option/Dependabot.js";const v=async c=>{for(const{Path:o,Name:e,Flow:l}of c)for(const[s,f]of await y(await k())){const t=`${s}/.github`,r=await l();if(o==="/")for(const i of f){const n=w(i).replace(s,""),a=(await g()).get(i.split("/").pop());r.add(`
    - package-ecosystem: "${typeof a<"u"?a:(()=>{switch(i.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${n||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof a<"u"?(()=>{switch(a){case"cargo":return"lockfile-only";default:return"increase"}})():"increase"}
`)}if(r.size>0){try{await $(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await u(`${t}${o}${e}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/dependabot.yml`)}}else try{await p(`${t}${o}${e}`,m.F_OK);try{await d(`${t}${o}${e}`)}catch{console.log(`Could not remove ${o}${e} for: ${t}`)}}catch{}}};var O=async()=>await v(h);export{O as default};
