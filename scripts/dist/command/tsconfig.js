import t from"fs";import{dirname as $}from"path";import u from"../lib/git-directories.js";import g from"../lib/package-types.js";import k from"../lib/packages.js";const h=async()=>{for(const{path:e,name:n,workflow:m}of files)for(const[p,w]of await u(await k())){const o=p+"/.github",r=await m();if(e=="/workflows/"&&n=="node.yml")for(const a of w){const c=$(a).replace(p,""),y=(await t.promises.readFile(a)).toString(),d=(await g()).get(a.split("/").pop());if(typeof d<"u"&&d==="npm"){const s=JSON.parse(y);for(const i of["bundledDependencies","peerDependencies","peerDependenciesMeta","dependencies","optionalDependencies","devDependencies","extensionDependencies","bundleDependencies"])typeof s[i]<"u"&&r.add(`
            - uses: actions/setup-node@v3.5.1
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${c}/pnpm-lock.yaml
            - run: pnpm install
              working-directory: .${c}
`);for(const i in s)if(Object.prototype.hasOwnProperty.call(s,i)){const l=s[i];if(i=="scripts")for(const f in l)Object.prototype.hasOwnProperty.call(l,f)&&f=="build"&&r.add(`
            - run: pnpm run build
              working-directory: .${c}
`)}}}if(r.size>1){try{await t.promises.mkdir(`${o}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${o}${e}`)}try{await t.promises.writeFile(`${o}${e}${n}`,`${Array.from(r).join("")}`)}catch{console.log(`Could not create workflow for: ${o}/dependabot.yml`)}}else try{await t.promises.access(`${o}${e}${n}`,t.constants.F_OK);try{await t.promises.rm(`${o}${e}${n}`)}catch{console.log(`Could not remove ${e}${n} for: ${o}`)}}catch{}}};var C=async()=>{await h()};export{C as default};
