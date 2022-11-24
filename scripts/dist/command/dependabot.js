import*as t from"fs";import{dirname as m}from"path";import d from"./../lib/git-directories.js";import w from"./../lib/package-types.js";import $ from"./../lib/packages.js";import u from"./../options/dependabot.js";const y=async p=>{for(const{path:o,name:r,workflow:f}of p)for(const[c,l]of await d(await $())){const e=`${c}/.github`,s=await f();if(o==="/")for(const a of l){const n=m(a).replace(c,""),i=(await w()).get(a.split("/").pop());s.add(`
    - package-ecosystem: "${typeof i<"u"?i:(()=>{switch(a.split(".").pop()){case"csproj":return"nuget";default:return"npm"}})()}"
      directory: "${n||"/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof i<"u"?i:(()=>{switch(a.split(".").pop()){case"cargo":return"lockfile-only";default:return"increase"}})()}
`)}if(s.size>0){try{await t.promises.mkdir(`${e}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${e}${o}`)}try{await t.promises.writeFile(`${e}${o}${r}`,`${[...s].join("")}`)}catch{console.log(`Could not create workflow for: ${e}/dependabot.yml`)}}else try{await t.promises.access(`${e}${o}${r}`,t.constants.F_OK);try{await t.promises.rm(`${e}${o}${r}`)}catch{console.log(`Could not remove ${o}${r} for: ${e}`)}}catch{}}};var j=async()=>{await y(u)};export{j as default};
