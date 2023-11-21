'use client'
import type { PropsWithChildren } from 'react'
import { Authenticator as AmplifyAuthenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import config from 'backend/config'

// configure Amplify
Amplify.configure(config, { ssr: true })

/**
 * Top-level "client" component to configure Amplify and set up the Auth context provider
 */
export function AmplifyConfigure({ children }: PropsWithChildren<{}>) {
  return (
    <AmplifyAuthenticator.Provider>{children}</AmplifyAuthenticator.Provider>
  )
}
