import { Router, Request, Response} from "express";

import fs from 'fs'

const DEFAULT_VERSION = '1-5-x'


const getYamlConfig = async (filename: string, version: string = DEFAULT_VERSION): Promise<string> => {
  return fs.readFileSync(`api/resources/config-templates/th2-infra/${version}/${filename}.yaml`).toString()
}

const getTh2InfraConfigsVersions = (): string[] => {
  return fs.readdirSync('api/resources/config-templates/th2-infra')
}

const checkTh2InfraVersion = (req: Request, res: Response, next: any) => {
  console.log(`version ${req.params.version}`)
  const versions = getTh2InfraConfigsVersions()
  const version: string = req.params.version?.toString() || DEFAULT_VERSION
  if (!versions.includes(version)){
    res.status(404).send(`Wrong th2-infra version: ${version}.\n Supported versions: ${versions.join(', ')}`)
    return 
  }
  next()
}

const router: Router = Router()

router.get('/:version/dashboard.values', checkTh2InfraVersion, async (req: Request, res: Response) => {
  try {
    let specifiedVersion = req.params.version
    let config = await getYamlConfig('dashboard.values', specifiedVersion)
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

router.get('/:version/helm-operator.values', checkTh2InfraVersion, async (req: Request, res: Response) => {
    try {
      let specifiedVersion = req.params.version
      const config = await getYamlConfig('helm-operator.values', specifiedVersion)
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/:version/ingress.values', checkTh2InfraVersion, async (req: Request, res: Response) => {
    try {
      let specifiedVersion = req.params.version
      const config = await getYamlConfig('ingress.values', specifiedVersion)
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/:version/loki.values', checkTh2InfraVersion, async (req: Request, res: Response) => {
    try {
      let specifiedVersion = req.params.version
      const config = await getYamlConfig('loki.values', specifiedVersion)
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/:version/prometheus-operator.values', checkTh2InfraVersion, async (req: Request, res: Response) => {
    try {
      let specifiedVersion = req.params.version
      let config = await getYamlConfig('prometheus-operator.values', specifiedVersion)
      config = config.replace(/<hosts>/g, req.query['hosts']?.toString() || '');
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/:version/pvcs', checkTh2InfraVersion, async (req: Request, res: Response) => {
    try {
      let specifiedVersion = req.params.version
      let config = await getYamlConfig('pvcs', specifiedVersion)
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/:version/pvs', checkTh2InfraVersion, async (req: Request, res: Response) => {
    try {
      let specifiedVersion = req.params.version
      let config = await getYamlConfig('pvs', specifiedVersion)
      config = config.replace(/<node-name>/g, req.query['node-name']?.toString() || 'minikube');
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/:version/secrets', checkTh2InfraVersion, async (req: Request, res: Response) => {
    try {
      let specifiedVersion = req.params.version
      let config = await getYamlConfig('secrets', specifiedVersion)
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })

router.get('/:version/service.values', checkTh2InfraVersion, async (req: Request, res: Response) => {
    try {
      let specifiedVersion = req.params.version
      let config = await getYamlConfig('service.values', specifiedVersion)
      // Available platforms: github, gitlab
      let platform = req.query['platform']?.toString() || 'github'
      let token = req.query['token']?.toString()
      console.log(token)
      config = config.replace(/<repository>/g, String(req.query['repository']))
        .replace(/<host>/g, req.query['host']?.toString() || '127.0.0.1')
        .replace(/<cassandra-host>/g, req.query['c-host']?.toString() || '127.0.0.1')
        .replace(/<datacenter>/g, req.query['dc']?.toString() || 'datacenter1')
      if (!!token){
        switch (platform) {
          case 'github':
            config = config.replace(/<username>/g, token)
              .replace(/<password>/g, "''")
            break;
          case 'gitlab':
            config = config.replace(/<username>/g, "''")
              .replace(/<password>/g, token)
            break;
          default:
            break;
        }
      }
      res.type('text/yaml')
      res.send(config)
    }
    catch (e) {
      res.status(500)
      res.send(e)
    }
  })


  export const configRouter = router