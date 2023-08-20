# [Yes] maintenance scripts

**.env**

```env
User="Username"
Base="Folder"
Token="AAAA"
```

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

## Then simply run each of the commands:

Delete all GitHub Actions runs and their logs for all of your repositories:

```sh
Maintenance Clean
```

Create a `dependabot.yml` file in each of the .github directories for each of
the packages in the monorepo:

```sh
Maintenance Dependabot
```

Dispatch all workflows for all repositories for a given user:

```sh
Maintenance Dispatch
```

or specific repositories by name:

```sh
Maintenance Dispatch Repository1 Repository2
```

Enable / disable all the features that GitHub offers for all the repositories
that you have access to:

```sh
Maintenance Edit
```

Create a `Node.yml` file in the `.github/workflows` directory for each
repository that has a `package.json` file.

```sh
Maintenance Node
```

Create a `NPM.yml` file in the `.github/workflows` directory for each repository
that has a `package.json` file.

```sh
Maintenance NPM
```

Create a `Rust.yml` file in the `.github/workflows` directory for each
repository that has a `Cargo.toml` file.

```sh
Maintenance Rust
```

Run all workflow tasks.

```sh
Maintenance Workflow
```

Find all the `package.json` files in the project, and then star all the
dependencies in that `package.json`.

```sh
Maintenance star
```

[yes]: https://github.com/YesMaintain
[@yesmaintain/script]: https://npmjs.org/@yesmaintain/script
