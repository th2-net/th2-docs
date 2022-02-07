import { Request, Response } from 'express'
import express from 'express'
const app = express()

app.get('/echo/:what', (req: Request, res: Response) => {
  res.json(req.params)
})

import {githubRouter} from "./githubController";
app.use('/github', githubRouter)

module.exports = {
  path: '/api',
  handler: app
}
