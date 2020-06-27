import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getPostIds, getAllPosts } from '@/lib/getAPI'
import MdToHtml from '@/lib/MdToHtml'
import DateFormat from '@/components/dateFns'
import SetContent from '@/components/set-content'
import Layout from '@/components/layout'
import styles from '@/style/[id].module.scss'

export default function Post(
{
	postData 
}: { 
	postData: {
		title: string,
		date: string,
		content: string,
	}
}) {
	const router = useRouter()
	const { id } = router.query
	return (
		<Layout>
			<Head>
	<title>{postData.title}{` - Kemomi Hack🐾`}</title>
			</Head>

			<div className={styles.breadList}>
				<Link href="/"><a>Home</a></Link>
				{` > `}
				{postData.title}
			</div>
			
			<article className={styles.article}>
				<h1 className={styles.h1}>{postData.title}</h1>
				<div className={styles.date}>
					<DateFormat dateString={postData.date} />
				</div>
				{/* <div><p>Post: { id }</p></div> */}
				<SetContent content={postData.content} />
			</article>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () =>{
	const res = getAllPosts(['id'])
	return {
		paths: res.map(post => {
			return {
				params: {
					id: post.id
				}
			}
		}),
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ( { params }) =>{
	const res = getPostIds(`${params.id}.md` as string)

	const content = await MdToHtml(res.content || '')
	return {
		props: {
			postData: {
				id: res.id,
				date: res.date,
				title: res.title,
				content: content
			}
		}
	}
}