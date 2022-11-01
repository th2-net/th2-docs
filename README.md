# th2-docs-nuxt

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
BASE_URL=http://localhost:3000/api
PUBLIC_BASE_URL=http://localhost:3000/api
```

## Run locally

Run to serve docs:

```shell
npm run build
npm run start
```

Run to edit docs:

```shell
npm run dev
```

# Running with Docker

You can run this repository within the Docker container. But hot reload for writing and development is unavailable, so you should restart container to see changes.

```
docker-compose --file docker-compose.writer.yaml up --build
```

The website will be available at http://localhost:3000.
