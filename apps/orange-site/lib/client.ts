import type { Schema } from 'backend/schema'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import config from 'backend/config'

const isConfigured = Object.keys(Amplify.getConfig()).length !== 0
if (!isConfigured) Amplify.configure(config)

export const client = generateClient<Schema>()
