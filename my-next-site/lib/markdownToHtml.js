//markdownToHtml.js

import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import slug from 'remark-slug'  // 追加

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(gfm)          // GitHub flavored markdown（テーブルなど）
    .use(slug)         // 見出しにIDをつける
    .use(html)
    .process(markdown)
  return result.toString()
}