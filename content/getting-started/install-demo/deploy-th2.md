---
title: "Step 4: Deploy th2"
weight: 20
chapter: false
image: /img/getting-started/th2-env-schema/Demo-cluster-components-4-install-th2.drawio.png
prev:
  title: "Set up cluster"
  link: /getting-started/install-demo/set-up-cluster
  icon: ""
next:
  title: "Create th2 environment"
  link: /getting-started/install-demo/create-env
  icon: ""
---

<custom-stepper steps="7" step="4" > </custom-stepper>

As a result of this step, you will deploy th2 into your Kubernetes cluster.
Upon its completion, you are expected to have the environment setup as shown on the picture below.

![](/img/getting-started/th2-env-schema/Demo-cluster-components-4-install-th2.drawio.png)

## Components of th2


### Helm Operator

The Helm Operator is a Kubernetes operator, allowing one to declaratively manage Helm chart releases.
Using this you can automatically create Kubernetes objects (as **Pods**, **Namespaces**, **Deployments**, **Configmaps**,
**Secrets**, **Custom Resources**).

### NGINX Ingress Controller

th2 uses its own implementation of the NGINX Ingress Controller.
It provides access to the th2 web services through HTTP.

### Prometheus

Prometheus is an open-source systems monitoring and alerting toolkit.
It will be used by Grafana as data source.
And also it contains **Custom Resource Definitions** (CRD) required by the th2 infra.

### th2 infra components

`th2-infra` helm chart contains description for 4 th2 components:
1. [_`th2-infra-editor`_](https://github.com/th2-net/th2-infra-editor)
2. [_`th2-infra-mgr`_](https://github.com/th2-net/th2-infra-mgr)
3. [_`th2-infra-operator`_](https://github.com/th2-net/th2-infra-operator)
4. [_`th2-infra-repo`_](https://github.com/th2-net/th2-infra-repo)


### Kubernetes Dashboard

[Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/)
is a web-based Kubernetes user interface.
With this tool you can monitor existing Kubernetes Objects and its details.

### Grafana

Grafana provides dashboard for the CPU, memory, and network usage of th2.

## Deploy th2

<notice warning >

Make sure that you are located in the `th2-infra/example-values` directory.

</notice >

### Download Helm charts

```shell
helm repo add fluxcd https://charts.fluxcd.io
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add th2 https://th2-net.github.io
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
helm repo add grafana https://grafana.github.io/helm-charts
```

### Install Helm charts

```shell
helm install --version=1.2.0 helm-operator -n service fluxcd/helm-operator -f ./helm-operator.values.yaml
helm install -n service --version=3.31.0 ingress ingress-nginx/ingress-nginx -f ./ingress.values.yaml
helm install --version=15.0.0 prometheus -n monitoring prometheus-community/kube-prometheus-stack -f ./prometheus-operator.values.yaml
helm install -n service --version=1.5.4 th2-infra th2/th2 -f ./service.values.yaml -f ./secrets.yaml
helm install dashboard -n monitoring kubernetes-dashboard/kubernetes-dashboard -f ./dashboard.values.yaml
helm install --version=0.40.1 loki -n monitoring grafana/loki-stack -f ./loki.values.yaml
```

### Check result

#### Pods

Check if service pods are running:

```shell
kubectl get pods -n service
```

Output example:

```shell
NAME                                               READY   STATUS    RESTARTS   AGE
helm-operator-79fc58f746-q8qwd                     1/1     Running   0          21d
infra-editor-7cd68c8587-q5tfp                      1/1     Running   0          20d
infra-mgr-67b65f4bb-gb4cc                          1/1     Running   0          20d
infra-operator-6b7987b55-zxxdt                     1/1     Running   0          20d
infra-repo-9c77fd6f7-xj9wf                         1/1     Running   0          20d
ingress-ingress-nginx-controller-b556b7cb5-gfrhl   1/1     Running   0          22d
rabbitmq-0                                         1/1     Running   0          21d
```

Check if monitoring pods are running:

```shell

kubectl get pods -n monitoring
```

Output example:

```shell
NAME                                                     READY   STATUS    RESTARTS   AGE
........
pod/dashboard-kubernetes-dashboard-77d85586db-j9v8f      1/1     Running   0          56s
alertmanager-prometheus-prometheus-oper-alertmanager-0   2/2     Running   0          75s
loki-0                                                   1/1     Running   0          4m47s
loki-promtail-wqfml                                      1/1     Running   0          4m47s
prometheus-grafana-68f8dd6d57-2gtns                      2/2     Running   0          82s
prometheus-kube-state-metrics-75d4cc9dbd-psb88           1/1     Running   0          82s
prometheus-prometheus-node-exporter-gfzp6                1/1     Running   0          82s
prometheus-prometheus-oper-operator-df668d457-snxks      1/1     Running   0          82s
prometheus-prometheus-prometheus-oper-prometheus-0       3/3     Running   1          65s        
........
```
#### Access from browser

Check access to `Grafana` (the default `user/password: admin/prom-operator` must be changed for information security purposes):  
`http://your-host:30000/grafana/login`.

## Check up installed services

<notice info >

To get the cluster hostname (your-host), execute the `kubectl cluster-info` command.

</notice >

- Kubernetes dashboard `http://your-host:30000/dashboard/`
- Grafana `http://your-host:30000/grafana/`
- th2-infra-editor `http://your-host:30000/editor/`
- RabbitMQ `http://your-host:30000/rabbitmq/`
- th2-reports `http://your-host:30000/your-namespace/`
