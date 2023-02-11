# [Yes] maintenance scripts

**.env**

```env
GITHUB_USER=your_github_username
BASE_DIR="your_development_folder"
GITHUB_AUTH_TOKEN="your_github_authentication_token"
```

## Installation

```sh
# Using NPM
npm install -g @yesmaintenance/scripts
# Using Yarn
yarn global add @yesmaintenance/scripts
# Using PNPM
pnpm install -g @yesmaintenance/scripts
```

or direct usage:

```sh
# Using NPM
npx @yesmaintenance/scripts
# Using Yarn
yarn @yesmaintenance/scripts
# Using PNPM
pnpx @yesmaintenance/scripts
```

## Then simply run each of the commands:

Delete all GitHub Actions runs and their logs for all of your repositories:

```sh
maintenance clean
```

Create a `dependabot.yml` file in each of the .github directories for each of
the packages in the monorepo:

```sh
maintenance dependabot
```

Dispatch all workflows for all repositories for a given user:

```sh
maintenance dispatch

# or specific repositories by name
maintenance dispatch repository-name repository-name-2
```

Enable / disable all the features that GitHub offers for all the repositories
that you have access to:

```sh
maintenance edit
```

Create a `node.yml` file in the `.github/workflows` directory for each
repository that has a `package.json` file.

```sh
maintenance node
```

Create a `rust.yml` file in the `.github/workflows` directory for each
repository that has a `Cargo.toml` file.

```sh
maintenance rust
```

Run all workflow tasks.

```sh
maintenance workflows
```

Find all the `package.json` files in the project, and then star all the
dependencies in that `package.json`.

```sh
maintenance star
```

[yes]: https://github.com/yesmaintenance
[@yesmaintenance/scripts]: https://npmjs.org/@yesmaintenance/scripts

[![Lightrix logo](https://raw.githubusercontent.com/Lightrix/npm/main/.github/img/favicon.png "Built with Lightrix/npm")](https://github.com/Lightrix/npm)
