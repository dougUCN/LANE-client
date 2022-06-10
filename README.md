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

See the [contribution guidelines](CONTRIBUTING.md)
