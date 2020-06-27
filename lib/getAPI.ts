import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'posts')

export function getPostIds(fileName: string, fields=[]) {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const items = {}

    fields.forEach(field => {
        if (field === 'fileName') {
            items[field] = id
        }
        if (field === 'content') {
            items[field] = content
        }
        if (data[field]) {
            items[field] = data[field]
        }
    })

    return {
        id,
        content,
        ...(data as { date: string, title: string })
    }
}

export function getAllPosts(fields=[]) {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPosts = fileNames.map(fileName => getPostIds(fileName, fields)
    ).sort((a, b) =>  {
         return a.date < b.date ? 1 : -1
    })

    return allPosts
}