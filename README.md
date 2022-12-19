# th2-docs
The repository contains the code that powers the th2 documentation portal available at [th2.dev](https://th2.dev/).
## About th2

The th2 toolkit is designed to enable automation in functional and non-functional testing for complex distributed transaction processing systems. These include securities trading systems and exchanges, banking and broker systems, post-trade (e.g. clearing, settlement, custody) and payments platforms, and many more. th2 is a Kubernetes-driven microservices solution tailor-made to deliver efficient machine-driven end-to-end test libraries with comprehensive coverage of your system. th2 consolidates the power of the entire Exactpro test tool suite in a single platform.

## Building the docs locally

1) Install [Node.js](https://nodejs.org/en/) version 16.13 or higher.
2) Install dependencies:
```bash
npm install
```
For detailed explanation check out [NuxtJS documentation](https://nuxtjs.org/docs/).

3) Configure environment.

Create `.env` file in the root directory:

```dotenv
GITHUB_TOKEN=GITHUB_TOKEN
```
4) Run the website locally for development purposes:

```shell
npm run dev
```
The website is running on `localhost:8080`.

## Contributing to th2-docs

th2 is an open-source project and so are the docs – we accept and value contributions. 

To suggest improvements or fix an issue in existing documentation, consider opening a pull request.

To help you contribute, each website page contains the **Edit this page** and **Create an issue** links in the upper right corner.

The **Edit this page** link will take you to the source file of the current page. To suggest improvements: 

1. Fork the `th2-docs` repo.
2. Clone the fork to your local machine.
3. Make the changes.
4. Create a pull request (PR) from your fork to the equivalent branch of the `th2-docs` repo.
5. Optional: let us know about your PR – [docops@exactpro.com](mailto:docops@exactpro.com).

When applying changes, follow the rules:

- PRs should be concise and easy to review. If you are planning widescale edits, consider opening several PRs.
- A PR should have a clear description of its purpose.

To report a problem, use the **Create an issue** button. 

The issue should have a short and concise title and a good description of the problem. The `by-reader` label is automatically assigned to the issues created by community members.  

New to Git? Learn more here: [How to contribute to an Open Source project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github). 

### Contribution style guide

- Give facts in Present Simple tense.
- Use active voice.
- Write in American English.
- Use sentence case. 
- Do not use jargon or slang. 
- Use **bold** formatting for UI elements. 
- Use *italics* formatting when giving example values or drawing attention to a specific word or phrase.
- Use backticks, `` ` ``, in Markdown to apply a monospace font and other styling to code in text, inline code, and user input. Use code blocks, `` ``` ``, for code samples or other blocks of code.

th2 components formatting guide:
- Short component names are formatted in **bold**, not capitalized.  
  E.g.: The **codec** component has eight pins – four stream, and four general ones.
- A full name is used when referring to an exact Git repository (with a link attached).
E.g.: This is a web app that displays the stored test data using [th2-rpt-data-provider](https://github.com/th2-net/th2-rpt-data-provider).
- Kubernetes namespaces are given in *italics*. 

E.g.: Infrastructure components are split into two namespaces: _monitoring_ and _service_. 

### Questions?
Contact us at [docops@exactpro.com](mailto:docops@exactpro.com).
