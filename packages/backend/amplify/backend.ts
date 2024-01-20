import { createRequire } from "node:module"
import { defineBackend } from "@aws-amplify/backend"
import * as cognito from "aws-cdk-lib/aws-cognito"
import * as iam from "aws-cdk-lib/aws-iam"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import * as lambda from "aws-cdk-lib/aws-lambda-nodejs"
import { auth } from "./auth/resource"
import { GROUPS } from "./constants"
import { AuthGroup } from "./custom/AuthGroup"
import { MyMap } from "./custom/MyMap"
import { data } from "./data/resource"

const require = createRequire(import.meta.url)

const backend = defineBackend({
	auth,
	data,
})

const { userPool } = backend.auth.resources

backend.auth.resources.cfnResources.cfnUserPool.addPropertyOverride(
	"Policies.PasswordPolicy.MinimumLength",
	32,
)

// create Cognito User Pool Groups
const groupsStack = backend.createStack("AuthGroups")
const groups: Record<string, AuthGroup> = {}
for (const group of Object.keys(GROUPS)) {
	groups[group] = new AuthGroup(groupsStack, `AuthGroup${group}`, {
		name: group,
		userPoolId: userPool.userPoolId,
	})
}

// create Auth Triggers
if (userPool instanceof cognito.UserPool) {
	const { graphqlApi } = backend.data.resources
	const triggersStack = backend.createStack("AuthTriggers")

	// create the Lambda function from our "post-confirmation" package
	const postConfirmation = new lambda.NodejsFunction(
		triggersStack,
		"PostConfirmation",
		{
			entry: require.resolve("post-confirmation"),
			runtime: Runtime.NODEJS_18_X,
		},
	)
	// allow it to call the AppSync API created by Amplify Data
	// postConfirmation.addToRolePolicy(
	//   new iam.PolicyStatement({
	//     actions: ['appsync:GraphQL'],
	//     resources: [graphqlApi.arn],
	//   }),
	// )

	// apply to user pool
	userPool.addTrigger(
		cognito.UserPoolOperation.POST_CONFIRMATION,
		postConfirmation,
	)
}

const mapStack = backend.createStack("MapStack")
new MyMap(mapStack, "Map", {
	mapName: "mymap",
	configuration: {
		style: "VectorEsriDarkGrayCanvas",
	},
})
