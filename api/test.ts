import { Router, Request, Response} from "express";
import {$content} from "@nuxt/content";

const router: Router = Router()

type ContentRepo = {
  Name: string,
  Type: string,
  Family: string,
  Language: string
}

router.get('/dashboard-info', async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { body: th2Repos }: { slug: string, body: ContentRepo[] } = await $content('th2-repos').fetch()
    res.send(th2Repos)
  }
  catch (e) {
    res.status(500)
    res.send(e)
  }
})

export const testRouter = router
