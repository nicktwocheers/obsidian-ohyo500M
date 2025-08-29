//markdownToHtml.js

import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import slug from 'remark-slug'  // 追加
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(gfm)          // GitHub flavored markdown（テーブルなど）
    .use(slug)         // 見出しにIDをつける
    .use(html)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)        // Markdown内のHTMLタグをそのままHTML変換
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown)
  return result.toString()
}

