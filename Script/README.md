# [YesMaintain] 🔧

Maintains GitHub repositories.

## Installation

Using NPM

```sh
npm install -g @yesmaintain/script
```

Using Yarn

```sh
yarn global add @yesmaintain/script
```

Using PNPM

```sh
pnpm install -g @yesmaintain/script
```

or direct usage:

Using NPM

```sh
npx @yesmaintain/script
```

Using Yarn

```sh
yarn @yesmaintain/script
```

Using PNPM

```sh
pnpx @yesmaintain/script
```

## CLI Usage:

Delete all GitHub Actions runs and their logs for all of your repositories:

```sh
Maintain Clean
```

Create a `dependabot.yml` file in each of the .github directories for each of
the packages in the monorepo:

```sh
Maintain Dependabot
```

Dispatch all workflows for all repositories for a given user:

```sh
Maintain Dispatch
```

or specific repositories by name:

```sh
Maintain Dispatch Repository1 Repository2
```

Enable / disable all the features that GitHub offers for all the repositories
that you have access to:

```sh
Maintain Edit
```

Create a `Node.yml` file in the `.github/workflows` directory for each
repository that has a `package.json` file.

```sh
Maintain Node
```

Create a `NPM.yml` file in the `.github/workflows` directory for each repository
that has a `package.json` file.

```sh
Maintain NPM
```

Create a `Rust.yml` file in the `.github/workflows` directory for each
repository that has a `Cargo.toml` file.

```sh
Maintain Rust
```

Run all workflow tasks.

```sh
Maintain Workflow
```

Find all the `package.json` files in the project, and then star all the
dependencies in that `package.json`.

```sh
Maintain Star
```

**.env**

```env
User="Username"
Base="Folder"
Token="AAAA"
```

[YesMaintain]: https://github.com/YesMaintain
[@yesmaintain/script]: https://npmjs.org/@yesmaintain/script
