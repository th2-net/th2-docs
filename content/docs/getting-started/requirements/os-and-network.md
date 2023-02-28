---
inner-title: Operational system and network requirements
weight: 5
---

# OS and network

<!-- ## Kubernetes minimum requirements
Machines that meet Kubernetes minimum requirements for the workers
https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#before-you-begin -->

## Operational system

|OS|Version|
|---|---|
|Ubuntu|16.04+|
|Debian|9+|
|CentOS|7|
|Red Hat Enterprise Linux (RHEL)|7|
|Fedora|25+|

## Network

1. Unique hostname, MAC address, and product_uuid for every node.
2. `swap` disabled. You **MUST** disable `swap` in order for the kubelet to work properly.
3. Full network connectivity between all machines in the cluster (public or private network).
4. `sudo` privileges on all machines.
5. SSH access from one device to all nodes in the system.

## Kubernetes ports

[Certain ports](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#check-required-ports) are open on your machines.

## Cassandra ports

|Port|Type|Purpose|
|---|---|---|
|7000|TCP|cluster communication|
|7001|TCP|cluster communication (SSL enabled)|
|9042|TCP|native protocol clients|
|7199|TCP|JMX|

### Customization

The internode communication and native protocol
ports are configurable in the Cassandra Configuration File.

The JMX
port is configurable in cassandra-env.sh (through JVM options).


## Connectivity to repositories and registries

Check if your machine has access to the following endpoints.

Repositories:

- Kubernetes dashboard: `https://kubernetes.github.io/dashboard/`
- FluxCD: `https://charts.fluxcd.io`
- Ingress NGINX: `https://kubernetes.github.io/ingress-nginx`
- Loki: `https://grafana.github.io/loki/charts`
- th2: `https://th2-net.github.io`

<notice note>

You can check accessibility of these links via browser by adding `/index.yaml` to the end of each link.

</notice>

Container registries:
- `ghcr.io`
- `quay.io`
- `docker.io`
- `k8s.gcr.io`

<!--Instructions about how to check accessibility needed--> 

<notice note>

To test the accessibility of container registries, the `telnet` command can be used in the terminal to connect to the `80` or `443` port.

For example:

```shell
telnet k8s.gcr.io 443
```

The command will return the following output:

```shell
Trying 142.251.9.82...
Connected to googlecode.l.googleusercontent.com.
Escape character is '^]'.
```

</notice>
