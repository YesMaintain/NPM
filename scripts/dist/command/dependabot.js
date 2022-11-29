import*as t from"fs";import{dirname as m}from"path";import d from"../lib/git-directories.js";import w from"../lib/package-types.js";import $ from"../lib/packages.js";import u from"../options/dependabot.js";const y=async p=>{for(const{path:o,name:r,workflow:f}of p)for(const[c,l]of await d(await $())){const e=`${c}/.github`,i=await f();if(o==="/")for(const s of l){const n=m(s).replace(c,""),a=(await w()).get(s.split("/").pop());i.add(`
    - package-ecosystem: "${typeof a<"u"?a:(()=>{switch(s.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${n||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof a<"u"?(()=>{switch(a){case"cargo":return"lockfile-only";default:return"increase"}})():"increase"}
`)}if(i.size>0){try{await t.promises.mkdir(`${e}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${e}${o}`)}try{await t.promises.writeFile(`${e}${o}${r}`,`${[...i].join("")}`)}catch{console.log(`Could not create workflow for: ${e}/dependabot.yml`)}}else try{await t.promises.access(`${e}${o}${r}`,t.constants.F_OK);try{await t.promises.rm(`${e}${o}${r}`)}catch{console.log(`Could not remove ${o}${r} for: ${e}`)}}catch{}}};var j=async()=>{await y(u)};export{j as default};
