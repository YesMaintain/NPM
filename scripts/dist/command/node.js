import{access as $,mkdir as y,readFile as g,rm as k,writeFile as h}from"fs/promises";import v from"../lib/git-directories.js";import b from"../lib/package-types.js";import D from"../lib/packages.js";import O from"../options/node.js";import{dirname as x}from"path";import{constants as F}from"fs";const j=async f=>{for(const{path:o,name:i,workflow:m}of f)for(const[p,w]of await v(await D("npm"))){const t=`${p}/.github`,n=await m();if(o==="/workflows/"&&i==="node.yml")for(const s of w){const e=x(s).replace(p,""),u=(await g(s,"utf-8")).toString(),d=(await b()).get(s.split("/").pop());if(typeof d<"u"&&d==="npm")try{const r=JSON.parse(u);for(const a of["bundledDependencies","bundleDependencies","dependencies","devDependencies","extensionDependencies","optionalDependencies","peerDependencies","peerDependenciesMeta"].sort())typeof r[a]<"u"&&n.add(`
            - uses: actions/setup-node@v3.6.0
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
`))}}catch(r){console.log(s),console.log(r)}}if(n.size>1){try{await y(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await h(`${t}${o}${i}`,`${[...n].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/node.yml`)}}else try{await $(`${t}${o}${i}`,F.F_OK);try{await k(`${t}${o}${i}`)}catch{console.log(`Could not remove ${o}${i} for: ${t}`)}}catch{}}};var B=async()=>{await j(O)};export{B as default};
