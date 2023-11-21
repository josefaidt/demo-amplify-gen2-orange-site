import type { Schema } from 'backend-schema'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import config from 'backend/config'
import { faker } from '@faker-js/faker'

Amplify.configure(config)
const client = generateClient<Schema>()
console.log('after configure', Amplify.getConfig())

function createRandomPost(): Omit<Schema['Post'], 'id' | 'comments'> {
  const link = faker.internet.url()
  return {
    author: faker.internet.userName(),
    title: faker.hacker.phrase(),
    link,
    linkHostname: new URL(link).hostname,
    body: faker.datatype.boolean() ? faker.lorem.paragraph() : null,
  }
}

function createRandomComment(
  postCommentsId: string,
): Omit<Schema['Comment'], 'id' | 'post' | 'replies'> {
  return {
    author: faker.internet.userName(),
    content: faker.lorem.paragraph(),
    postCommentsId,
  }
}

async function main(limit: number = 30) {
  if (isNaN(limit)) {
    throw new Error(`limit must be a number, got ${limit}`)
  }
  for (let i = 1; i < limit + 1; i++) {
    console.log(`seeding ${i}...`)
    const post = createRandomPost()
    let createdPost = null
    try {
      createdPost = await client.models.Post.create(post)
    } catch (cause) {
      console.error(`failed to seed ${i}`, cause)
      throw new Error(`failed to seed ${i}`, { cause })
    }
    // for (let j = 0; j < faker.number.int({ max: 20 }); j++) {
    //   console.log(
    //     `seeding ${j} comment for ${createdPost.data.createPost.id}...`,
    //   )
    //   const postCommentsId = createdPost.data.createPost.id
    //   const comment = createRandomComment(postCommentsId)
    //   try {
    //     await API.graphql({
    //       query: mutations.createComment,
    //       authMode: 'API_KEY',
    //       variables: { input: comment },
    //     })
    //   } catch (cause) {
    //     console.error(
    //       `failed to seed ${j} comment for ${postCommentsId}`,
    //       cause,
    //     )
    //     throw new Error(`failed to seed ${j} comment for ${postCommentsId}`, {
    //       cause,
    //     })
    //   }
    // }
  }
}

const [, , limit] = process.argv

main(parseInt(limit, 10))
