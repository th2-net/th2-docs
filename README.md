# th2-docs

## About th2

The th2 toolkit is designed to enable automation in functional and non-functional testing for complex distributed transaction processing systems. These include securities trading systems and exchanges, banking and broker systems, post-trade (e.g. clearing, settlement, custody) and payments platforms, and many more. th2 is a Kubernetes-driven microservices solution tailor-made to deliver efficient machine-driven end-to-end test libraries with comprehensive coverage of your system. th2 consolidates the power of the entire Exactpro test tool suite in a single platform.

## Requirements for building the docs locally

1) Install [Node.js 16.13.2 LTS](https://nodejs.org/en/).
2) Install dependencies
```bash
npm install
```
For detailed explanation check out [NuxtJS documentation](https://nuxtjs.org/docs/). 
3) Configure environment:

Create `.env` file in the root directory:

```dotenv
GITHUB_TOKEN=GITHUB_TOKEN
```
4) Run the website locally for development purposes

```shell
npm run dev
```
The website is running on `localhost:8080`

## Contributing to th2-docs

th2 is an open-source project and contributions are welcome. 

If you have an idea how to improve existing documentation or noticed an issue and know how to fix it, consider opening a pull request for it.

On each website page there are two buttons with help you to contribute:
- **Edit this page**
- **Create an issue**

In case you know how to improve a page or fix an issue on it, use **Edit this page** button. 

1. Find an issue, or a page you want to improve. 
2. Click **Edit this page**.
3. Create a fork of the `th2-docs` repo.
4. Clone the fork to your local machine.
5. Make the changes.
6. Create a pull request (PR) from your fork to the equivalent branch of the `th2-docs` repo.
7. Let th2 docs team know about your PR by writing a letter to docops@exactpro.com.

Read more on [how to contribute to an Open Source project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github). 

When applying changes follow the rules:

- PRs should be small and reviewable.
- PR should have a clear description of its purpose.

In case you just want to highlight any issue, use **Create an issue** button. 

The issue should have a short and concise title and a good description of the problem. `by-reader` label is automatically assigned to issues created by users.  

## High-level contribution guidelines

- Give facts in Present Simple tense.
- Use active voice.
- Use American spelling.
- Use sentence case. 
- Use **bold** formatting for UI elements. 
- Use *italics* formatting when drawing attention to a specific word or phrase, when giving example values.
- Use ` in Markdown to apply a monospace font and other styling to code in text, inline code, and user input. Use code blocks, ```, for code samples or other blocks of code.

## th2 components formatting
- Short component name formatted in **Bold**, not capitalized.  
  E.g. The **codec** component has eight pins - four stream, and four general ones.
- Full name is used when referring to exact Git repository (with a link attached).
E.g. This is a web app that displays the stored test data using [th2-rpt-data-provider](https://github.com/th2-net/th2-rpt-data-provider). 

### Feel free to contact us
docops@exactpro.com