// pages/posts/[slug].js
import fs from 'fs'
import path from 'path'
import markdownToHtml from '../../lib/markdownToHtml'

// ページ化するパスの一覧を作成
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content'))
  const paths = files.map(filename => {
    return {
      params: {
        slug: filename.replace(/\.md$/, '')  // ファイル名から拡張子を除外してslugに
      }
    }
  })

  return { paths, fallback: false } // すべてのページを静的生成
}

// slugに応じたMarkdownファイルを読み込みHTMLに変換してpropsとして渡す
export async function getStaticProps({ params }) {
  const fullPath = path.join(process.cwd(), 'content', `${params.slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const contentHtml = await markdownToHtml(fileContents)

  return {
    props: {
      contentHtml
    }
  }
}

// コンポーネントでHTMLコンテンツを表示
export default function Post({ contentHtml }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
  )
}

