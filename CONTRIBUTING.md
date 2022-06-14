# Contributing

### 1. Set up the precommit linting hook

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

### 2. Github actions

This project uses [Github Actions](https://docs.github.com/en/actions) to validate all pull requests. To view the pipelines applied to this project, either view the `Actions` tab on Github, or see the yaml config files titled `.github/workflows/*.yml`

The Node version for the Github Actions verification is 16.15.0 (which matches the version used in on the staging and production servers). Note that attempting to run `npm install` on 16.15.1 requires the `--force` flag for successful install

### 3. Working with the GraphQL Client (URQL)

This project uses URQL as the GraphQL Client. For more information on how to use URQL, please refer to the [official documentation](https://formidable.com/open-source/urql/docs/basics/react-preact/#run-a-first-query).

To generate types for GraphQL document declarations, run the following command in the `client` directory:

```
npm run generate
```

This will create a `generated.ts` file within the `src` directory with types and functions that can be used during development. This file is only used for development purposes and should not be checked into git in order to avoid possible merge conflicts.

**Note**:

Since this project uses the `typed-document-node` plugin, GraphQL Code Generator recommends that all gql document declarations should be made outside of `.ts`/`.tsx` files and in a `.graphql` file.

For example, given a file named `Dog.tsx`, all graphql document declarations should reside in a corresponding `Dog.graphql` file instead. For more information, please refer to the official documentation [here](https://www.graphql-code-generator.com/docs/guides/react#apollo-and-urql).

### 4. Styling (CSS)

This project uses Tailwind CSS framework for styling. To maintain consistency across the codebase, please do not create custom css files. Instead, all styling should be done in HTML/React JSX files. For more information on Tailwind CSS, please refer to the [official docs](https://tailwindcss.com/docs/utility-first) or try it out [here](https://play.tailwindcss.com/).

### 5. Working with the LANE Server

The LANE server repository is located [here](https://github.com/dougUCN/LANE-server)

The LANE server uses [Ariadne](https://ariadnegraphql.org/), a schema-first graphql python library.

### 6. GraphQL Endpoints

The websocket endpoint (for GraphQL Subscriptions) is located at `ws://localhost:8000/graphql/`

The http endpoint (for Queries and Mutations) is located at `http://localhost:8000/graphql/`

Django default settings are such that the `/` at the end of the above urls is _mandatory_

**Note:** Ariadne implements [subscriptions-transport-ws](https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md) protocol for GraphQL subscriptions. Unfortunately, this is not a maintained library. Furthermore, as of May 2022 Ariadne has not implemented support for [graphql-ws](https://github.com/enisdenjo/graphql-ws), which is an active library for a similar protocol. Fundamentally, `graphql-ws` and `subscriptions-transport-ws` are different protocols, and as such any clients attempting to access the server with `graphql-ws` for subscriptions will be unsuccessful

By default, LANE client assumes the graphql endpoint is located at `localhost:8000/graphql/`. To point a local instance of the LANE client towards an endpoint hosted elsewhere, such as the staging server on Heroku, in the root directory create a file `.env.local` with the contents

```
# Environment variables exposed to vite must start with VITE_
VITE_GRAPHQL_HTTP_ENDPOINT="https://lane-server.herokuapp.com/graphql/"
VITE_GRAPHQL_WS_ENDPOINT="ws://lane-server.herokuapp.com/graphql/"
```

### 7. Nginx

Nginx is utilized as a reverse proxy that routes requests to the client (on port 3000). For additional information on Nginx see the [official documentation](https://www.nginx.com/resources/wiki/start/). The Nginx `.conf` files for both staging and production servers are version controlled on this repository.

### 8. PM2

PM2 is the process manager that ensures the client application stays online. View the official documentation [here](https://pm2.keymetrics.io/docs/usage/quick-start/). PM2 is utilized on both staging and production servers. The `ecosystem.config.js` files that serve as the configuration start scripts for PM2 are version controlled on this repository.

### 9. Staging

[AWS EC2](https://aws.amazon.com/ec2/) is the staging server. It may be accessed at http://ec2-44-202-29-2.compute-1.amazonaws.com/ems. (Note that LANE currently only supports `http` not `https`)

The Node version on staging is 16.15.0, which matches the version in production and in the github actions pipelines.

The steps for setting up the client on AWS EC2 are outlined as follows:

1. Make an AWS account and launch an EC2 instance
2. Generate an SSH key-pair for the EC2 instance, and save the private key.
3. Create a security group with SSH, http, and https access permissions
4. ssh into the EC2 instance, install `nvm` (with Node version 16.15.0), `git`, and `nginx` using provided AWS EC2 package managers. Install `pm2` globally with `npm install pm2 -g`
5. Use `systemctl` to start nginx
6. Create a nginx configuration file in `/etc/nginx/conf.d/lane.conf`. (This is version controlled in the repo)
7. Restart nginx
8. `git clone` the LANE-client repo into the `$HOME` directory
9. Verify that the `aws/deploy.sh` script runs correctly on EC2. (It is likely that `chmod u+x` is required)
10. Add your EC2 login username and private key into Github secrets on the repo

The github actions for CI on AWS will ssh into the EC2 instance, run `git pull` and then run the pulled `aws/deploy.sh`
