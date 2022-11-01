import { Request, Response } from 'express'
import express from 'express'
const app = express()

app.disable('x-powered-by')

app.get('/echo/:what', (req: Request, res: Response) => {
  res.json(req.params)
})

import {githubRouter} from "./githubController";
import {testRouter} from "./test";
import {configRouter} from "./configController";
import {contentRouter} from "./contentController";
import {termsRouter}from './termsController'

app.use('/github', githubRouter)
app.use('/test', testRouter)
app.use('/config', configRouter)
app.use('/content', contentRouter)
app.use('/terms', termsRouter)

module.exports = {
  path: '/api',
  handler: app
}
