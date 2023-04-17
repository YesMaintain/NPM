import*as a from"fs";import{constants as p}from"fs/promises";import{basename as w,dirname as g}from"path";import $ from"../lib/git-directories.js";import u from"../lib/package-types.js";import y from"../lib/packages.js";import d from"../options/rust.js";const h=async m=>{for(const{path:o,name:t,workflow:f}of m)for(const[i,l]of await $(await y())){const r=`${i}/.github`,e=await f();if(o==="/workflows/"&&t==="rust.yml")for(const s of l){const c=g(s).replace(i,""),n=(await u()).get(s.split("/").pop());typeof n<"u"&&n==="cargo"&&e.add(`
            - uses: actions/cache@v3.3.1
              with:
                  path: |
                      ~/.cargo/bin/
                      ~/.cargo/registry/index/
                      ~/.cargo/registry/cache/
                      ~/.cargo/git/db/
                      target/
                  key: \${{ runner.os }}-cargo-\${{ hashFiles('.${c}/Cargo.toml') }}
            - uses: actions-rs/cargo@v1.0.3
              with:
                command: build
                args: --release --all-features --manifest-path .${c}/${w(s)}
`)}if(e.size>1){try{await a.promises.mkdir(`${r}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${r}${o}`)}try{await a.promises.writeFile(`${r}${o}${t}`,`${[...e].join("")}`)}catch{console.log(`Could not create workflow for: ${r}/workflows/rust.yml`)}}else try{await a.promises.access(`${r}${o}${t}`,p.F_OK);try{await a.promises.rm(`${r}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${r}`)}}catch{}}};var j=async()=>{await h(d)};export{j as default};
