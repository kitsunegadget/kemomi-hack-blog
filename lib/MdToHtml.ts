import remark from 'remark'
import html from 'remark-html'

export default async function ParseContent(content: string) {
	const processed = await remark().use(html).process(content)
	return processed.toString() 
}