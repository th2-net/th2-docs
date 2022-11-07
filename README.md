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

## Test website

You can run any configuration with Cypress UI. To start it:

```shell
npm run cypress:open
```

### Development

To test docs website in development mode you should run development server firstly:

```shell
npm run dev
```

Then run `development.cy.ts` spec from UI or by executing:

```shell
npm run cypress:test-dev
```

### Prebuilt website

To test production version of docs website you should build it and run local server firstly:

```shell
npm run build
npm run prod:local
```

Then run `production.local.cy.ts` spec from UI or by executing:

```shell
npm run cypress:test-prebuilt-prod
```

### Production

To test deployed docs website run `production.cy.ts` spec from UI or by executing:

```shell
npm run cypress:test-prod
```

