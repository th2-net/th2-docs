import { Router, Request, Response} from "express";

import fs from 'fs'

const DEFAULT_VERSION = 'v1-5-x'



const getYamlConfig = async (filename: string, version: string = DEFAULT_VERSION): Promise<string> => {
  return fs.readFileSync(`api/resources/config-templates/th2-infra/${version}/${filename}.yaml`).toString()
}

const getTh2InfraConfigsVersions = (): string[] => {
  return fs.readdirSync('api/resources/config-templates/th2-infra')
}

const checkTh2InfraVersion = (req: Request, res: Response): boolean => {
  const versions = getTh2InfraConfigsVersions()
  const version: string = req.query['v']?.toString() || DEFAULT_VERSION
  if (!versions.includes(version)){
    res.status(404).send(`Wrong th2-infra version: ${version}.\n Supported versions: ${versions.join(', ')}`)
    return false
  }
  return true
}

const router: Router = Router()
router.use((req: Request, res: Response, next) => {
  if (!checkTh2InfraVersion(req, res)) return
  next()
})

router.get('/dashboard.values', async (req: Request, res: Response) => {
  try {
    let config = await getYamlConfig('dashboard.values')
    getTh2InfraConfigsVersions()
    config = config.replaceAll('<hosts>', req.query['hosts']?.toString() || '');
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
      const config = await getYamlConfig('helm-operator.values')
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
      const config = await getYamlConfig('ingress.values')
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
      const config = await getYamlConfig('loki.values')
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
      let config = await getYamlConfig('prometheus-operator.values')
      config = config.replace(/<hosts>/g, req.query['hosts']?.toString() || '');
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
      let config = await getYamlConfig('pvcs')
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
      let config = await getYamlConfig('pvs')
      config = config.replace(/<node-name>/g, req.query['node-name']?.toString() || 'minikube');
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
      let config = await getYamlConfig('secrets')
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
      let config = await getYamlConfig('pvs')
      config = config.replace(/<repository>/g, String(req.query['repository']))
        .replace(/<host>/g, req.query['host']?.toString() || '127.0.0.1')
        .replace(/<cassandra-host>/g, req.query['c-host']?.toString() || '127.0.0.1')
        .replace(/<datacenter>/g, req.query['dc']?.toString() || 'datacenter1')
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

  export const configRouter = router