import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/getAPI'
import { GetStaticProps } from 'next'
import styles from '@/style/index.module.scss'

export default function Index({
  postsData
}: {
  postsData: {
    title: string,
    date: string,
    id: string,
    dir: string
  }[]
}) {
  const firstData = postsData[0]
  const moreData = postsData.slice(1);

  return (
    <Layout>
      <Head>
        <meta property="og:title" content="Kemomi Hack🐾" />
        <meta property="og:description" content="Yu's mini blog." />
        <meta property="og:image" content="https://kemomihack.netlify.app/icon128.png" />
        {/* <title>test</title> */}
      </Head>

      <div className={styles.outside}>
        <h2>{`New!`}</h2>
        <section>
          <div className={styles.firstData}>
            <Link href="/posts/[firstData.dir]/[firstData.id]" as={`/posts/${firstData.dir}/${firstData.id}`}>
              <a>
                <div className={styles.card}>
                  {firstData.date}{': '}{ firstData.title}
                </div>
              </a>
            </Link>
          </div>
        </section>

        <h2>{`More...`}</h2>

        <section>
          <ul className={styles.ul}>
            {moreData.map(({ title, date, id, dir }) => (
              <li key={id} className={styles.list}>
                <Link href="/posts/[dir]/[id]" as={`/posts/${dir}/${id}`}>
                  <a>{date}{': '}{ title }</a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const postsData = getAllPosts()
  return {
    props: { postsData: postsData }
  }
}
