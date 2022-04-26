import { $content } from "@nuxt/content"
import { Router, Request, Response} from "express"

const router: Router = Router()

router.get('/:term', async (req: Request, res: Response) => {
  try {
    const term: string = req.params['term']
    const [definition]: any  = await $content('/terms', { deep: true })
      .where({ title: term })
      .only(['title', 'body'])
      .fetch()
    if (!definition) {
      res
        .status(404)
        .send({ term: term, status: 'Not Found' })
      return
    }
    res.send(definition)
  }
  catch (e) {
    res.status(500)
    res.send(e)
  }
})

export const termsRouter = router
