import {$content} from "@nuxt/content";
import {Th2Version} from "../../apiTypes/content/versions";

export const getTh2Versions = async (): Promise<Th2Version[]> => {
  const versions = await $content('/versions', { deep: true })
    .where({ path: { $regex: /\/versions\/[^\/]*\/_index/ } })
    .fetch()
  const versionsTyped = versions.map((v: any): Th2Version => ({
    number: v.title,
    major_version: v.major_version,
    content_dir: v.dir
  }))
  return versionsTyped
}
