---
title: 2. Publish infra schema
weight: 1
tokens_link:
  - title: Creating a personal access token
    icon: mdi-github
    href: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
---

## th2-infra-schema

**th2-infra-schema** is an abstract representation of interdependencies between the th2 components.
The actual schemas in form of repositories are created in line with a purpose of a testing system that you are building.

Some example configurations of a **th2-infra-schema** repository are available in different branches of the
[`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master) repository.

## Publish th2-infra-schema

You have several variants how to publish **th2-infra-schema**:
- Create new repository from scratch
- Copy the template repository

You can use either GitHub or GitLab for hosting repository.

[`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master)
is the template repository with predefined schemas, which you can use.

Fork the [`th2-infra-schema-demo`](https://github.com/th2-net/th2-infra-schema-demo/tree/master)
repository or use it as a template. It can be either **public** or **private**.

![](/img/getting-started/th2-infra-schema/git-based/clone-th2-infra-schema-demo.png)

<notice info >

th2 will sync with this published **th2-infra-schema** using `ssh`.
In the future, you will provide the link to this repository in a separate th2 configuration.

</notice >

## Access to the th2-infra-schema Git repository for th2

The `th2-infra-mgr` component monitors the `th2-infra-schema` repository and updates it
according to the user's actions in the `th2-infra-editor` GUI. To make it possible,
it is required that the `th2-infra-mgr` component is granted SSH access with write permissions.

Different Git systems have different mechanisms for accessing to repository. So your next actions depend on the system where your th2-infra-schema is published.

### GitHub

Previosly th2 used SSH keys for accessing to GitHub repositories, but now this system is deprecated.

Relevant way to provide access is using personal access tokens.

<recommendations :items="tokens_link" ></recommendations>

It is required to grant permissions from `repo` scope. Other permissions are not needed.

![Token permissions](/img/getting-started/install-th2/gh-token-permissions.png)

During the next step you will need to configure SSH link to your repository. 

Your link to access GitHub repository will be constructed the next pattern:

`https://<your_github_login>:<access_token>@github.com/<repository_owner>/<repository_name>.git`

For example:

`https://bestDeveloper:xxx@github.com/th2-net/th2-infra-schema-demo.git`

### GitLab

GitLab uses SSH keys to authorize all requests to read and change repository.

Generate SSH keys without a passphrase:

```shell
ssh-keygen -t rsa -m pem -f ./infra-mgr-rsa.key
```

[Add an SSH key to your GitLab account](https://docs.gitlab.com/ee/ssh/#add-an-ssh-key-to-your-gitlab-account)

Create a Kubernetes Secret `infra-mgr` from the private SSH key:

```shell
kubectl -n service create secret generic infra-mgr --from-file=infra-mgr=./infra-mgr-rsa.key
```

In this case your link for configuration will be the default link to clone repository with SSH.