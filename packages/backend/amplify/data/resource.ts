import { defineData } from '@aws-amplify/backend'
import { schema } from 'backend-schema'

export const data: ReturnType<typeof defineData> = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})
