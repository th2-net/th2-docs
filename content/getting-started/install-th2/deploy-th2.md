---
title: "Step 4: Deploy th2"
weight: 20
chapter: false
image: /img/getting-started/th2-env-schema/Demo-cluster-components-4-install-th2.drawio.png
prev:
  title: "Set up cluster"
  link: "./set-up-cluster"
  icon: ""
next:
  title: "Create th2 environment"
  link: "./create-env"
  icon: ""
---

<custom-stepper steps="5" step="4" > </custom-stepper>

As a result of this step, you will deploy th2 into your Kubernetes cluster.
Upon its completion, you are expected to have the environment setup as shown on the picture below.

![](/img/getting-started/th2-env-schema/Demo-cluster-components-4-install-th2.drawio.png)

## Deploy th2

<notice warning >

Make sure that you are located in the `th2-infra/example-values` directory.

</notice >

### Install the Helm Operator

The Helm Operator is a Kubernetes operator, allowing one to declaratively manage Helm chart releases.
Using this you can automatically create Kubernetes objects (as **Pods**, **Namespaces**, **Deployments**, **Configmaps**,
**Secrets**, **Custom Resources**).

Download and install the Helm Operator:

```shell
helm repo add fluxcd https://charts.fluxcd.io
helm install --version=1.2.0 helm-operator -n service fluxcd/helm-operator -f ./helm-operator.values.yaml
```

<spoiler title="Check if helm-operator deployment is running" >

Get the `helm-operator` deployment:

```shell
kubectl get deployment -n service -l app=helm-operator
```

Output example:

```shell
NAME            READY   UP-TO-DATE   AVAILABLE   AGE
helm-operator   1/1     1            1           40d
```

</spoiler >

### Install the NGINX Ingress Controller

th2 uses its own implementation of the NGINX Ingress Controller.
It provides access to the th2 web services through HTTP.

Download and install the NGINX Ingress Controller:

```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install -n service --version=3.31.0 ingress ingress-nginx/ingress-nginx -f ./ingress.values.yaml
```



<spoiler title="Check if the NGINX Ingress Controller is running" >

Get the NGINX Ingress Controller deployment:

```shell
kubectl get deployment -n service -l app.kubernetes.io/name=ingress-nginx
```

Output example:

```shell
NAME                               READY   UP-TO-DATE   AVAILABLE   AGE
ingress-ingress-nginx-controller   1/1     1            1           41d
```

</spoiler >

### Install Prometheus

Prometheus is an open-source systems monitoring and alerting toolkit.
It will be used by Grafana as data source.
And also it contains **Custom Resource Definitions** (CRD) required by the th2 infra.

Download and install Prometheus:

```shell
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install --version=15.0.0 prometheus -n monitoring prometheus-community/kube-prometheus-stack -f ./prometheus-operator.values.yaml
```

<spoiler title="Check if Prometheus is running" >

Get the Prometheus pod:

```shell
kubectl get pod -n monitoring -l app=kube-prometheus-stack-operator
```

Output example:

```shell
NAME                                                   READY   STATUS    RESTARTS   AGE
prometheus-kube-prometheus-operator-584874d66c-td4hc   1/1     Running   0          41d
```

</spoiler >

### Install th2-infra components in the _`service`_ namespace

`th2-infra` helm chart contains description for 4 th2 components:
1. [_`th2-infra-editor`_](https://github.com/th2-net/th2-infra-editor)
2. [_`th2-infra-mgr`_](https://github.com/th2-net/th2-infra-mgr)
3. [_`th2-infra-operator`_](https://github.com/th2-net/th2-infra-operator)
4. [_`th2-infra-repo`_](https://github.com/th2-net/th2-infra-repo)

Download and install `th2-infra`:

<notice note >

In the sample command replace `<version>` with the `th2-infra` release version you need, please follow the [release notes](https://github.com/th2-net/th2-infra/releases).

</notice >

```shell
helm repo add th2 https://th2-net.github.io
helm install -n service --version=<version> th2-infra th2/th2 -f ./service.values.yaml -f ./secrets.yaml
```

<spoiler title="Check if th2-infra is installed correctly" >

Get the `th2-infra` Pods:

```shell
kubectl -n service get deployments infra-editor infra-mgr infra-operator infra-repo
```

Output example:

```shell
NAME             READY   UP-TO-DATE   AVAILABLE   AGE
infra-editor     1/1     1            1           35d
infra-mgr        1/1     1            1           35d
infra-operator   1/1     1            1           35d
infra-repo       1/1     1            1           35d
```

</spoiler >

<!-- Bookmark -->

### Install Kubernetes Dashboard

Dashboard is a web-based Kubernetes user interface.
With this tool you can monitor existing Kubernetes Objects and its details.

Download and install
[Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/):

```shell
helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
helm install dashboard -n monitoring kubernetes-dashboard/kubernetes-dashboard -f ./dashboard.values.yaml
```

<spoiler title="Check if the Dashboard is running" >

Get the Dashboard pod:
```shell
kubectl get pod -n monitoring -l app.kubernetes.io/name=kubernetes-dashboard
```

Output example:

```shell
NAME                                              READY   STATUS    RESTARTS   AGE
dashboard-kubernetes-dashboard-567678889f-2snh7   1/1     Running   0          40d
```

</spoiler >

### Install Grafana

Grafana provides dashboard for the CPU, memory, and network usage of th2.

Download and install Grafana:

```shell
helm repo add grafana https://grafana.github.io/helm-charts
helm install --version=0.40.1 loki -n monitoring grafana/loki-stack -f ./loki.values.yaml
```

<spoiler title="Check if the Grafana is installed correctly" >

Get the Grafana pod:

```shell
kubectl get pod -n monitoring -l app.kubernetes.io/name=grafana
```

Output example:

```shell
NAME                                  READY   STATUS    RESTARTS   AGE
prometheus-grafana-74ff7fcbd4-h2r8t   2/2     Running   0          41d
```

</spoiler >

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
