import y from"../Library/Directory.js";import $ from"../Library/Package.js";import g from"../Library/Type.js";import h from"../Option/Node.js";import{constants as k}from"fs";import{access as v,mkdir as b,readFile as D,rm as N,writeFile as F}from"fs/promises";import{dirname as O}from"path";const P=async f=>{for(const{Path:e,Name:n,File:m}of f)for(const[p,u]of await y(await $("NPM"))){const o=`${p}/.github`,r=await m();if(e==="/workflows/"&&n==="Node.yml")for(const c of u){const t=O(c).replace(p,""),w=(await D(c,"utf-8")).toString(),l=(await g()).get(c.split("/").pop());if(typeof l<"u"&&l==="NPM"){const a=JSON.parse(w);for(const i of["bundledDependencies","bundleDependencies","dependencies","devDependencies","extensionDependencies","optionalDependencies","peerDependencies","peerDependenciesMeta"].sort())typeof a[i]<"u"&&r.add(`
            - uses: actions/setup-node@v3.8.1
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${t}/pnpm-lock.yaml

            - run: pnpm install
              working-directory: .${t}
`);for(const i in a)if(Object.prototype.hasOwnProperty.call(a,i)){const d=a[i];if(i==="scripts")for(const s in d)Object.prototype.hasOwnProperty.call(d,s)&&(s==="build"&&r.add(`
            - run: pnpm run build
              working-directory: .

            - uses: actions/upload-artifact@v3.1.3
              with:
                  name: .${t.replaceAll("/","-")}-Node-\${{ matrix.node-version }}-Target
                  path: .${t}/Target
`),s==="prepublishOnly"&&r.add(`
            - run: pnpm run prepublishOnly
              working-directory: .

            - uses: actions/upload-artifact@v3.1.3
              with:
                  name: .${t.replaceAll("/","-")}-Node-\${{ matrix.node-version }}-Target
                  path: .${t}/Target
`),s==="test"&&r.add(`
            - run: pnpm run test
              working-directory: .${t}
`))}}}if(r.size>1){try{await b(`${o}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${o}${e}`)}try{await F(`${o}${e}${n}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${o}/workflows/Node.yml`)}}else try{await v(`${o}${e}${n}`,k.F_OK);try{await N(`${o}${e}${n}`)}catch{console.log(`Could not remove ${e}${n} for: ${o}`)}}catch{}}};var J=async()=>await P(h);export{J as default};
