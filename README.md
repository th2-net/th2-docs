# th2-docs-nuxt

## Requirements

You will need to install [Node.js 16.13.2 LTS](https://nodejs.org/en/)

Installation can take an hour, because it downloads [VS build tools](https://visualstudio.microsoft.com/downloads/?q=build+tools).
You can install it beforehand.

## Install Dependencies

```bash
npm install
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Configure env

Create `.env` file in the root directory

```dotenv
GITHUB_CLIENT_ID=GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=GITHUB_CLIENT_SECRET
BASE_URL=http://localhost:3000/api
PUBLIC_BASE_URL=http://localhost:3000/api
```

## Run Locally

Run to serve docs

```shell
npm run build
npm run start
```

Run to edit docs

```shell
npm run dev
```

# Running with docker

You can run this repository within docker container. But hot reload for writing and development is unavailable. So you should restart container to see changes.

```
docker-compose up --file docker-compose.writer.yaml --build
```

Site will available on http://localhost:3000
