import {processSearchMixin} from "../mixins/processSearch";

export const getRoutes = async () => {
  const { $content } = require("@nuxt/content");
  const files = await $content({ deep: true }).only(["path", "dir", "updatedAt"]).fetch();

  return processSearchMixin.methods.processPagesPaths(files).map(page => {
    return {
      url: page.path,
      lastmod: page.updatedAt
    }
  })
}
