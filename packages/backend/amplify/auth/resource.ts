import { defineAuth } from "@aws-amplify/backend"
import { render as renderVerificationEmail } from "verification-email/render"

/**
 * Define and configure your auth resource
 * When used alongside data, it is automatically configured as an auth provider for data
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth: ReturnType<typeof defineAuth> = defineAuth({
	loginWith: {
		email: {
			verificationEmailSubject: "Welcome 👋 verify your email!",
			verificationEmailBody: (code) => renderVerificationEmail(code),
		},
	},
	multifactor: {
		mode: "OPTIONAL",
		totp: true,
		sms: false,
	},
	userAttributes: {
		preferredUsername: {
			required: true,
			mutable: true,
		},
	},
})
