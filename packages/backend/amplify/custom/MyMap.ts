import * as location from "aws-cdk-lib/aws-location"
import * as cdk from "aws-cdk-lib/core"
import { Construct } from "constructs"

export class MyMap extends location.CfnMap {
	constructor(scope: Construct, id: string, props: location.CfnMapProps) {
		super(scope, id, props)

		// "geo": {
		//   "amazon_location_service": {
		//     "region": "us-east-1",
		//     "maps": {
		//       "items": {
		//         "map8d5492f2-dev": {
		//           "style": "VectorEsriStreets"
		//         }
		//       },
		//       "default": "map8d5492f2-dev"
		//     }
		//   }
		// }
		const geo = {
			amazon_location_service: {
				region: cdk.Aws.REGION,
				maps: {
					items: {
						[this.mapName]: {
							style: (
								this.configuration as location.CfnMap.MapConfigurationProperty
							).style,
						},
						// ... and more
					},
					default: [this.mapName],
				},
			},
		}

		new cdk.CfnOutput(this, "geo", {
			value: JSON.stringify(geo),
		})
	}
}
