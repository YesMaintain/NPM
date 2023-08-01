import{constants as $}from"fs";import{access as y,mkdir as g,readFile as k,rm as h,writeFile as v}from"fs/promises";import{dirname as b}from"path";import D from"../lib/GitDirectories.js";import O from"../lib/PackageTypes.js";import x from"../lib/packages.js";import F from"../options/NODE.js";const j=async f=>{for(const{path:o,name:i,workflow:m}of f)for(const[p,w]of await D(await x("npm"))){const t=`${p}/.github`,n=await m();if(o==="/workflows/"&&i==="node.yml")for(const s of w){const e=b(s).replace(p,""),u=(await k(s,"utf-8")).toString(),d=(await O()).get(s.split("/").pop());if(typeof d<"u"&&d==="npm")try{const r=JSON.parse(u);for(const a of["bundledDependencies","bundleDependencies","dependencies","devDependencies","extensionDependencies","optionalDependencies","peerDependencies","peerDependenciesMeta"].sort())typeof r[a]<"u"&&n.add(`
            - uses: actions/setup-node@v3.7.0
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${e}/pnpm-lock.yaml
            - run: pnpm install
              working-directory: .${e}
`);for(const a in r)if(Object.prototype.hasOwnProperty.call(r,a)){const l=r[a];if(a==="scripts")for(const c in l)Object.prototype.hasOwnProperty.call(l,c)&&(c==="build"&&n.add(`
            - run: pnpm run build
              working-directory: .${e}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${e.replaceAll("/","-")}-node-\${{ matrix.node-version }}-dist
                  path: .${e}/dist
`),c==="prepublishOnly"&&n.add(`
            - run: pnpm run prepublishOnly
              working-directory: .${e}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${e.replaceAll("/","-")}-node-\${{ matrix.node-version }}-dist
                  path: .${e}/dist
`),c==="test"&&n.add(`
            - run: pnpm run test
              working-directory: .${e}
`))}}catch(r){console.log(s),console.log(r)}}if(n.size>1){try{await g(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await v(`${t}${o}${i}`,`${[...n].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/node.yml`)}}else try{await y(`${t}${o}${i}`,$.F_OK);try{await h(`${t}${o}${i}`)}catch{console.log(`Could not remove ${o}${i} for: ${t}`)}}catch{}}};var _=async()=>{await j(F)};export{_ as default};
