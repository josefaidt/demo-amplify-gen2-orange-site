import Link from 'next/link'
import { client } from '@/lib/client'

export type PostListProps = {
  /**
   * Optional next token to control page
   */
  nextToken?: string
  /**
   * Author of the posts
   */
  // author?: string
}

export async function PostList({ nextToken }: PostListProps) {
  const { data, errors } = await client.models.Post.list({
    limit: 30,
    nextToken,
  })
  return (
    <div>
      {errors?.length ? <p>Error loading posts</p> : null}
      <ul className="flex flex-col gap-2">
        {data?.map((post) => {
          const url = new URL(post.link)
          const points = 0
          return (
            <li data-postid={post.id} key={post.id}>
              <a href={post.link}>{post.title}</a>{' '}
              <span className="text-gray-400 text-sm">
                <a
                  className="hover:underline"
                  href={`/from?site=${encodeURIComponent(url.hostname)}`}
                >
                  ({url.hostname})
                </a>
              </span>
              <div className="text-gray-500 text-sm">
                <span>
                  {points} {points === 1 ? 'point' : 'points'} by{' '}
                  <a
                    className="hover:underline"
                    href={`/by?author=${encodeURIComponent(post.author)}`}
                  >
                    {post.author}
                  </a>
                </span>{' '}
                {post.comments?.length > 0 ? (
                  <>
                    | <Link href={`/post/${post.id}`}>comments</Link>
                  </>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
