import{constants as m}from"fs";import{access as p,mkdir as d,rm as $,writeFile as u}from"fs/promises";import{dirname as w}from"path";import y from"../Library/Directory.js";import g from"../Library/Package.js";import k from"../Library/Type.js";import h from"../Option/Dependabot.js";const C=async n=>{for(const{Path:e,Name:a,File:l}of n)for(const[s,f]of await y(await g())){const t=`${s}/.github`,r=await l();if(e==="/")for(const i of f){const c=w(i).replace(s,""),o=(await k()).get(i.split("/").pop());o!=="Cloudflare"&&r.add(`
    - package-ecosystem: "${typeof o<"u"?String(o).toLowerCase():(()=>{switch(i.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${c||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof o<"u"?(()=>{switch(o){case"Cargo":return"lockfile-only";default:return"increase"}})():"increase"}
`)}if(r.size>0){try{await d(`${t}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${e}`)}try{await u(`${t}${e}${a}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/dependabot.yml`)}}else try{await p(`${t}${e}${a}`,m.F_OK);try{await $(`${t}${e}${a}`)}catch{console.log(`Could not remove ${e}${a} for: ${t}`)}}catch{}}};var x=async()=>await C(h);export{x as default};
