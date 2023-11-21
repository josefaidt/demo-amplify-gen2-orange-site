import { client } from '@/lib/client'

export default async function Home() {
  const posts = await client.models.Post.list()
  console.log('posts are ', posts)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {posts.errors?.length ? <p>Error</p> : null}
      {posts.data?.map((post) => <p key={post.id}>{post.title}</p>)}
    </main>
  )
}
