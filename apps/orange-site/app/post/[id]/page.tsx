import { client } from "@/lib/client"
import cn from "clsx"

export default async function PostPage({ params }: { params: { id: string } }) {
	const { data: post, errors } = await client.models.Post.get({ id: params.id })
	if (errors?.length) {
		// @todo process errors
		return <div>Unable to get post</div>
	}
	const url = new URL(post.link)
	return (
		<div>
			<article>
				<h2>{post.title}</h2>
				<span className={cn("text-gray-400")}>
					<a href={post.link} rel="noopener noreferrer">
						{url.hostname}
					</a>
				</span>
				{post.body ? <p>{post.body}</p> : null}
			</article>
			<div>{/* comments */}</div>
		</div>
	)
}

export async function generateStaticParams() {
	const posts = await client.models.Post.list({
		authMode: "iam",
	})

	if (posts.errors?.length) {
		throw new Error("Unable to list posts, prerender post page", {
			cause: posts.errors,
		})
	}

	return posts.data.map((post) => ({
		id: post.id,
	}))
}
