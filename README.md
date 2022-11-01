# th2-docs

## Requirements

You will need to install [Node.js 16.13.2 LTS](https://nodejs.org/en/).

Installation can take up to an hour, because it downloads [VS build tools](https://visualstudio.microsoft.com/downloads/?q=build+tools).
You can install it beforehand.

## Install dependencies

```bash
npm install
```

For detailed explanation on how things work, check out [NuxtJS documentation](https://nuxtjs.org/docs/).

## Configure environment

Create `.env` file in the root directory:

```dotenv
GITHUB_CLIENT_ID=GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=GITHUB_CLIENT_SECRET
```

## Develop

Run to edit docs:

```shell
npm run dev
```

Run to only explore database with GraphQL:

```shell
npm run explore
```
