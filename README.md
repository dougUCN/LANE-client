# LANE client

### 1. Getting started

Begin by cloning the repository:

```
git clone https://github.com/dougUCN/LANE-client.git
```

### 2. Installing FE dependencies

In the `client` directory, run

```
npm install
```

**Note:** The following step requires the BE graphql endpoint to be running

then

```
npm run generate
```

and to run the FE

```
npm run dev
```

# Contributing

### Set up the precommit linting hook

Eslint is used to check the FE code

It is recommended to set up a precommit hook to ensure that code is being properly formatted

In the root directory, run

```
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

To ensure that the eslint pre-commit check is running correctly, create a branch with a commit that contains a `console.log`. If the commit is passes with a warning `warning Unexpected console statement no-console` then the pre-commit is working.

Please note that Eslint warnings will error in the linting check by the Github Actions pipeline when a PR is opened.

Upon opening a pull request on `main`, linting checks will be applied with the same settings as the precommit

### Propagating changes to the main repository

The FE repo `main` branch is a submodule in the [main repository](https://github.com/dougUCN/LANE.git). 

When `main` in the FE repo has been updated via PR, this change must be propagated to `main` in the LANE repo as a separate PR.
