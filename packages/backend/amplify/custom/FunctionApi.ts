import type { Role } from "aws-cdk-lib/aws-iam"
import {
	FunctionUrlAuthType,
	InvokeMode,
	Runtime,
} from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import * as cdk from "aws-cdk-lib/core"
import { Construct } from "constructs"

export type FunctionApiProps = {
	/**
	 * Allow IAM roles to call this Function by its URL
	 */
	allowRoles: Role[]
}

export class FunctionApi extends Construct {
	public readonly handler: NodejsFunction
	public readonly url: string

	constructor(scope: Construct, id: string, props: FunctionApiProps) {
		super(scope, id)

		const { allowRoles } = props

		const handler = new NodejsFunction(this, "Handler", {
			runtime: Runtime.NODEJS_20_X,
			entry: "./handler.ts",
		})

		const functionUrl = handler.addFunctionUrl({
			authType: FunctionUrlAuthType.AWS_IAM,
			invokeMode: InvokeMode.BUFFERED,
		})

		for (const role of allowRoles) {
			functionUrl.grantInvokeUrl(role)
		}

		this.handler = handler
		this.url = functionUrl.url

		new cdk.CfnOutput(this, "function_api_url", {
			value: functionUrl.url,
		})
	}
}
