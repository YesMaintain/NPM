# [Yes] maintenance scripts

**.env**

```env
GITHUB_USER=your_github_username
BASE_DIR="your_development_folder"
GH_AUTH_TOKEN="your_github_authentication_token"
```

## Installation

Using NPM

```sh
npm install -g @yesmaintenance/scripts
```

Using Yarn

```sh
yarn global add @yesmaintenance/scripts
```

Using PNPM

```sh
pnpm install -g @yesmaintenance/scripts
```

or direct usage:

Using NPM

```sh
npx @yesmaintenance/scripts
```

Using Yarn

```sh
yarn @yesmaintenance/scripts
```

Using PNPM

```sh
pnpx @yesmaintenance/scripts
```

## Then simply run each of the commands:

Delete all GitHub Actions runs and their logs for all of your repositories:

```sh
Maintenance clean
```

Create a `dependabot.yml` file in each of the .github directories for each of
the packages in the monorepo:

```sh
Maintenance dependabot
```

Dispatch all workflows for all repositories for a given user:

```sh
Maintenance dispatch
```

or specific repositories by name:

```sh
Maintenance dispatch repository-name repository-name-2
```

Enable / disable all the features that GitHub offers for all the repositories
that you have access to:

```sh
Maintenance edit
```

Create a `node.yml` file in the `.github/workflows` directory for each
repository that has a `package.json` file.

```sh
Maintenance node
```

Create a `npm.yml` file in the `.github/workflows` directory for each repository
that has a `package.json` file.

```sh
Maintenance npm
```

Create a `rust.yml` file in the `.github/workflows` directory for each
repository that has a `Cargo.toml` file.

```sh
Maintenance rust
```

Run all workflow tasks.

```sh
Maintenance workflows
```

Find all the `package.json` files in the project, and then star all the
dependencies in that `package.json`.

```sh
Maintenance star
```

[yes]: https://github.com/yesmaintenance
[@yesmaintenance/scripts]: https://npmjs.org/@yesmaintenance/scripts
