import {$content} from "@nuxt/content";

export const getPage = async (path: string): Promise<any> => {

  return await $content(path).fetch()
}
