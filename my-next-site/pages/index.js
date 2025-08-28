import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export async function getStaticProps() {
  const contentDir = path.join(process.cwd(), 'content')
  let files = []
  try {
    files = fs.readdirSync(contentDir)
  } catch {
    files = []
  }
  const slugs = files.map(filename => filename.replace(/\.md$/, ''))
  return {
    props: { slugs },
  }
}

export default function Home({ slugs }) {
  if (!slugs || slugs.length === 0) {
    return <div>No posts found.</div>
  }
  return (
    <div>
      <h1>Welcome to My Markdown Blog</h1>
      <ul>
        {slugs.map(slug => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>
              {slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}