import m from"../Library/Directory.js";import p from"../Library/Package.js";import $ from"../Library/Type.js";import d from"../Option/Dependabot.js";import{constants as u}from"fs";import{access as y,mkdir as w,rm as g,writeFile as k}from"fs/promises";import{dirname as h}from"path";const F=async n=>{for(const{Path:e,Name:a,File:l}of n)for(const[s,f]of await m(await p())){const t=`${s}/.github`,r=await l();if(e==="/")for(const i of f){const c=h(i).replace(s,""),o=(await $()).get(i.split("/").pop());o!=="Cloudflare"&&r.add(`
    - package-ecosystem: "${typeof o<"u"?String(o).toLowerCase():(()=>{switch(i.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${c||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof o<"u"?(()=>{switch(o){case"Cargo":return"lockfile-only";default:return"increase"}})():"increase"}
`)}if(r.size>0){try{await w(`${t}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${e}`)}try{await k(`${t}${e}${a}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/dependabot.yml`)}}else try{await y(`${t}${e}${a}`,u.F_OK);try{await g(`${t}${e}${a}`)}catch{console.log(`Could not remove ${e}${a} for: ${t}`)}}catch{}}};var G=async()=>await F(d);export{G as default};
