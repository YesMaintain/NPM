import{constants as $}from"fs";import{access as y,mkdir as g,readFile as h,rm as k,writeFile as v}from"fs/promises";import{dirname as b}from"path";import D from"../Library/Directory.js";import N from"../Library/Package.js";import O from"../Library/Type.js";import F from"../Option/Node.js";const x=async f=>{for(const{Path:e,Name:i,File:m}of f)for(const[p,u]of await D(await N("NPM"))){const o=`${p}/.github`,r=await m();if(e==="/workflows/"&&i==="Node.yml")for(const c of u){const t=b(c).replace(p,""),w=(await h(c,"utf-8")).toString(),l=(await O()).get(c.split("/").pop());if(typeof l<"u"&&l==="NPM")try{const n=JSON.parse(w);for(const a of["bundledDependencies","bundleDependencies","dependencies","devDependencies","extensionDependencies","optionalDependencies","peerDependencies","peerDependenciesMeta"].sort())typeof n[a]<"u"&&r.add(`
            - uses: actions/setup-node@v3.8.1
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${t}/pnpm-lock.yaml

            - run: pnpm install
              working-directory: .${t}
`);for(const a in n)if(Object.prototype.hasOwnProperty.call(n,a)){const d=n[a];if(a==="scripts")for(const s in d)Object.prototype.hasOwnProperty.call(d,s)&&(s==="build"&&r.add(`
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
`))}}catch(n){console.log(c),console.log(n)}}if(r.size>1){try{await g(`${o}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${o}${e}`)}try{await v(`${o}${e}${i}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${o}/workflows/Node.yml`)}}else try{await y(`${o}${e}${i}`,$.F_OK);try{await k(`${o}${e}${i}`)}catch{console.log(`Could not remove ${e}${i} for: ${o}`)}}catch{}}};var A=async()=>await x(F);export{A as default};
