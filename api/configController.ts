import { Router, Request, Response} from "express";

import axios from "axios";

const router: Router = Router()

router.get('/dashboard.values', async (req: Request, res: Response) => {
  try {
    const response = await axios({
      method: "get",
      url: 'https://raw.githubusercontent.com/ComButterbrot/th2-infra/master/example-values/dashboard.values.yaml'
  })
    const config = response.data
      .replace(/<hosts>/g, req.query['hosts'] || '');
    res.type('text/yaml')
    res.send(config)
  }
  catch (e) {
    res.status(500)
    res.send(e)
  }
})

router.get('/helm-operator.values', async (req: Request, res: Response) => {
    try {
      const response = await axios({
        method: "get",
        url: 'https://raw.githubusercontent.com/ComButterbrot/th2-infra/master/example-values/helm-operator.values.yaml'
    })
      const config = response.data
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/ingress.values', async (req: Request, res: Response) => {
    try {
      const response = await axios({
        method: "get",
        url: 'https://raw.githubusercontent.com/ComButterbrot/th2-infra/master/example-values/ingress.values.yaml'
    })
      const config = response.data
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/loki.values', async (req: Request, res: Response) => {
    try {
      const response = await axios({
        method: "get",
        url: 'https://raw.githubusercontent.com/ComButterbrot/th2-infra/master/example-values/loki.values.yaml'
    })
      const config = response.data
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/prometheus-operator.values', async (req: Request, res: Response) => {
    try {
      const response = await axios({
        method: "get",
        url: 'https://raw.githubusercontent.com/ComButterbrot/th2-infra/master/example-values/prometheus-operator.values.yaml'
    })
      const config = response.data
        .replace(/<hosts>/g, req.query['hosts'] || '');
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/pvcs', async (req: Request, res: Response) => {
    try {
      const response = await axios({
        method: "get",
        url: 'https://raw.githubusercontent.com/ComButterbrot/th2-infra/master/example-values/pvcs.yaml'
    })
      const config = response.data
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/pvs', async (req: Request, res: Response) => {
    try {
      const response = await axios({
        method: "get",
        url: 'https://raw.githubusercontent.com/ComButterbrot/th2-infra/master/example-values/pvs.yaml'
    })
      const config = response.data
        .replace(/<node-name>/g, req.query['node-name'] || 'minikube');
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/secrets', async (req: Request, res: Response) => {
    try {
      const response = await axios({
        method: "get",
        url: 'https://raw.githubusercontent.com/ComButterbrot/th2-infra/master/example-values/secrets.yaml'
    })
      const config = response.data
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/service.values', async (req: Request, res: Response) => {
    try {
      const response = await axios({
        method: "get",
        url: 'https://raw.githubusercontent.com/ComButterbrot/th2-infra/master/example-values/service.values.yaml'
    })
      const config = response.data
        .replace(/<repository>/g, req.query['repository'])
        .replace(/<host>/g, req.query['host'] || '127.0.0.1')
        .replace(/<cassandra-host>/g, req.query['c-host'] || '127.0.0.1')
        .replace(/<datacenter>/g, req.query['dc'] || 'datacenter1')
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

  export const configRouter = router