import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'posts')

export function getPostIds(fileName: string, fields=[]) {
    // when dir 
    let dir = fileName.replace(/\\.+/, '')
    if (dir === fileName) {
        dir = '/'
    }
    const id = fileName.replace(/\.md$/, '').replace(/^.+\\/, '')

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
        dir,
        content,
        ...(data as { date: string, title: string })
    }
}

export function getAllPosts(fields=[]) {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPosts = fileNames.map(fileName => {
        // if directory
        const reg = /\.md$/
        if (!reg.test(fileName)) {
            const fileNames = fs.readdirSync(join(postsDirectory, fileName))
            fileNames.forEach(f => {
                if (reg.test(f)) {
                    fileName = join(fileName, f) 
                }
            })
        }
        return getPostIds(fileName, fields)
    })

    const sortedPosts = allPosts.sort((a, b) =>  {
         return a.date < b.date ? 1 : -1
    })

    return sortedPosts
}