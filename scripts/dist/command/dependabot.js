import e from"fs";import{dirname as l}from"path";import w from"../lib/git-directories.js";import $ from"../lib/package-types.js";import d from"../lib/packages.js";import y from"../options/dependabot.js";const g=async p=>{for(const{path:o,name:r,workflow:f}of p)for(const[s,m]of await w(await d())){const t=s+"/.github",a=await f();if(o=="/")for(const i of m){const c=l(i).replace(s,""),n=(await $()).get(i.split("/").pop());a.add(`
    - package-ecosystem: "${typeof n<"u"?n:(()=>{switch(i.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${c||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: increase
`)}if(a.size>0){try{await e.promises.mkdir(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await e.promises.writeFile(`${t}${o}${r}`,`${Array.from(a).join("")}`)}catch{console.log(`Could not create workflow for: ${t}/dependabot.yml`)}}else try{await e.promises.access(`${t}${o}${r}`,e.constants.F_OK);try{await e.promises.rm(`${t}${o}${r}`)}catch{console.log(`Could not remove ${o}${r} for: ${t}`)}}catch{}}};var C=async()=>{await g(y)};export{C as default};
