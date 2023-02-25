import * as r from "fs";
import { dirname as y } from "path";
import g from "../lib/git-directories.js";
import k from "../lib/package-types.js";
import h from "../lib/packages.js";
import v from "../options/node.js";
const D=async m=>{for(const{path:e,name:i,workflow:w}of m)for(const[d,$]of await g(await h())){const o=`${d}/.github`,s=await w();if(e==="/workflows/"&&i==="node.yml")for(const c of $){const t=y(c).replace(d,""),u=(await r.promises.readFile(c,"utf-8")).toString(),l=(await k()).get(c.split("/").pop());if(typeof l<"u"&&l==="npm")try{const n=JSON.parse(u);for(const a of["bundledDependencies","bundleDependencies","dependencies","devDependencies","extensionDependencies","optionalDependencies","peerDependencies","peerDependenciesMeta"].sort())typeof n[a]<"u"&&s.add(`
            - uses: actions/setup-node@v3.6.0
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${t}/pnpm-lock.yaml
            - run: pnpm install
              working-directory: .${t}
`);for(const a in n)if(Object.prototype.hasOwnProperty.call(n,a)){const f=n[a];if(a==="scripts")for(const p in f)Object.prototype.hasOwnProperty.call(f,p)&&(p==="build"&&s.add(`
            - run: pnpm run build
              working-directory: .${t}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${t.replaceAll("/","-")}-node-\${{ matrix.node-version }}-dist
                  path: .${t}/dist
`),p==="test"&&s.add(`
            - run: pnpm run test
              working-directory: .${t}
`))}}catch(n){console.log(c),console.log(n)}}if(s.size>1){try{await r.promises.mkdir(`${o}${e}`,{recursive:!0})}catch{console.log(`Could not create: ${o}${e}`)}try{await r.promises.writeFile(`${o}${e}${i}`,`${[...s].join("")}`)}catch{console.log(`Could not create workflow for: ${o}/workflows/node.yml`)}}else try{await r.promises.access(`${o}${e}${i}`,r.constants.F_OK);try{await r.promises.rm(`${o}${e}${i}`)}catch{console.log(`Could not remove ${e}${i} for: ${o}`)}}catch{}}};var C=async()=>{await D(v)};export { C as default };

