# LANE client

### 1. Getting started

Begin by cloning the repository:

```
git clone https://github.com/dougUCN/LANE-client.git
```

### 2. LANL Proxy settings

If not installing on a LANL computer, skip to the next step

To set npm proxy settings for LANL, run

```
npm config set proxy http://proxyout.lanl.gov:8080
npm config set https-proxy http://proxyout.lanl.gov:8080 # Yes, the address should be http
```

### 3. Installing FE dependencies

In the `client` directory, run

```
npm install
```

then run any one of the below 3 steps

```bash
npm run generate        # BE server needs to be running at http://127.0.0.1:8000/graphql/
# or
npm run generate:local # BE repository with the name `*server` needs to be cloned in the same directory that LANE-client is located
# or
npm run generate:staging # https://lane-server.herokuapp.com/graphql/ must be accessible
```

and to run the FE

```
npm run dev
```

# Contributing

See the [contribution guidelines](CONTRIBUTING.md)
