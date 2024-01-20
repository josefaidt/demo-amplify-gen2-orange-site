import type { ClientSchema } from "@aws-amplify/backend"
import { a } from "@aws-amplify/backend"
import { GROUPS, MODELS } from "../constants"

export const schema = a.schema({
	[MODELS.Post]: a
		.model({
			id: a.id(),
			author: a.string().required(), // readable owner username
			title: a.string().required(),
			body: a.string(),
			link: a.url().required(),
			linkHostname: a.string(), // TODO add an index
			comments: a.hasMany(MODELS.Comment),
			// createdAt: a.datetime().default(new Date().toISOString()),
			// updatedAt: a.datetime().default(new Date().toISOString()),
			// upvotes: a.hasMany(MODELS.Upvote).arrayOptional(),
		})
		.authorization([
			// @TODO flip these for custom owner field
			a.allow
				.owner()
				.inField("author"),
			a.allow.owner(),
			a.allow.specificGroup(GROUPS.admins).to(["read", "update", "delete"]),
			a.allow.private("userPools").to(["list", "get"]),
			a.allow.public("iam").to(["list", "get"]),
			a.allow.private("iam").to(["create"]),
			// a.allow.public().to(['list', 'get']),
			// TEMPORARY
			a.allow
				.public()
				.to(["list", "get", "create"]),
		]),
	[MODELS.Comment]: a
		.model({
			id: a.id(),
			author: a.string().required(), // readable owner username
			content: a.string().required(),
			post: a.belongsTo(MODELS.Post),
			replies: a.hasMany(MODELS.Comment),
			// upvotes: a.hasMany(MODELS.Upvote).arrayOptional(),
		})
		.authorization([
			// @TODO flip these for custom owner field
			a.allow
				.owner()
				.inField("author"),
			a.allow.owner(),
			a.allow.specificGroup(GROUPS.admins).to(["read", "update", "delete"]),
			a.allow.private("userPools").to(["list", "get"]),
			a.allow.public("iam").to(["list", "get"]),
			a.allow.private("iam").to(["create"]),
			// a.allow.public().to(['list', 'get']),
			// TEMPORARY
			a.allow
				.public()
				.to(["list", "get", "create"]),
		]),
	// [MODELS.Upvote]: a
	//   .model({
	//     id: a.id(),
	//     // @TODO: union support for POST | COMMENT
	//     post: a.belongsTo(MODELS.Post).valueOptional(),
	//     comment: a.belongsTo(MODELS.Comment).valueOptional(),
	//   }) // @TODO: if not union, then add a custom resolver to check if post or comment exists
	//   .authorization([
	//     a.allow.owner().to(['create', 'read', 'delete']),
	//     a.allow.private('iam').to(['list']),
	//   ]),
	[MODELS.UserProfile]: a
		.model({
			id: a.id(),
		})
		.authorization([
			a.allow.owner().to(["read", "update"]),
			a.allow.private("iam").to(["read", "update", "delete"]),
		]),
})

export type Schema = ClientSchema<typeof schema>
