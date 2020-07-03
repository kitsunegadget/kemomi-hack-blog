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
				<meta property="og:title" content={`${postData.title} - Kemomi Hack🐾`} />
				<meta property="og:description" content="Yu's mini blog." />
				<meta property="og:image" content="https://kemomihack.netlify.app/icon128.png" />
				<title>{`${postData.title} - Kemomi Hack🐾`}</title>
				<script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
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
			<div className={styles.twitterButton}>
				<a 
					href="https://twitter.com/share?ref_src=twsrc%5Etfw" 
					className="twitter-share-button" 
					data-show-count="false">
						Tweet
				</a>
			</div>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () =>{
	const res = getAllPosts(['id'])
	return {
		paths: res.map(post => {
			return {
				params: {
					dir: post.dir,
					id: post.id,
				}
			}
		}),
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ( { params }) =>{
	const res = getPostIds(`${params.dir}/${params.id}.md` as string)

	const content = await MdToHtml(res.content || '')
	return {
		unstable_revalidate: 1,
		props: {
			postData: {
				dir: res.dir,
				id: res.id,
				date: res.date,
				title: res.title,
				content: content
			}
		}
	}
}