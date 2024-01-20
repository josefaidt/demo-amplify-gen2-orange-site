import * as cognito from "aws-cdk-lib/aws-cognito"
import * as cdk from "aws-cdk-lib/core"
import { Construct } from "constructs"

export type ReferencedAuthProps = {
	/**
	 * ARN of the Cognito User Pool
	 */
	userPoolArn: string
}

export class ReferencedAuth extends Construct {
	public readonly userPoolId: cognito.IUserPool["userPoolId"]

	constructor(scope: Construct, id: string, props: ReferencedAuthProps) {
		super(scope, id)

		const { userPoolArn } = props

		const userPool = cognito.UserPool.fromUserPoolArn(
			this,
			"UserPool",
			userPoolArn,
		)

		this.userPoolId = userPool.userPoolId

		new cdk.CfnOutput(this, "userPoolId", { value: this.userPoolId })
		new cdk.CfnOutput(this, "signupAttributes", {
			value: JSON.stringify(["EMAIL"]),
		})
		new cdk.CfnOutput(this, "usernameAttributes", {
			value: JSON.stringify(["EMAIL"]),
		})
		new cdk.CfnOutput(this, "verificationMechanisms", {
			value: JSON.stringify(["EMAIL"]),
		})
		// ...
	}
}
