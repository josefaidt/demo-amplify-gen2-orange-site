import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/data"
import type { PostConfirmationTriggerHandler } from "aws-lambda"
import config from "backend/config"
import type { Schema } from "backend/schema"

// configure Amplify library to generate client
Amplify.configure(config)
const client = generateClient<Schema>({
	authMode: "iam",
})

/**
 * PostConfirmation Auth Trigger to create a UserProfile model
 */
export const handler: PostConfirmationTriggerHandler = async (event) => {
	console.log("event: ", event)

	// only handle profile creation during sign-ups, not forgot password
	if (event.triggerSource !== "PostConfirmation_ConfirmSignUp") return

	const { userName } = event
	const { userAttributes } = event.request

	const profile = await client.models.UserProfile.create({
		owner: `${userAttributes.sub}::${userName}`,
	})
	if (profile.errors?.length) {
		console.error("failed to create profile: ", profile.errors)
		throw new Error("failed to create profile", { cause: profile.errors })
	}
	console.log("created profile: ", profile.data.id)

	return event
}
