import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { render } from '@react-email/render'

export type VerificationEmailProps = {
  /**
   * Account verification from Amazon Cognito
   */
  code: string
}

/**
 * Verification email template for Amazon Cognito
 * run `npm run amplify-dev-email`
 */
export function VerificationEmail({ code = '123456' }: VerificationEmailProps) {
  return (
    // <Html>
    //   <Head>
    //     <title>Your verification code</title>
    //   </Head>
    //   <Preview>Confirm your email address</Preview>
    <Body
      style={{
        backgroundColor: '#ffffff',
        margin: '0 auto',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Section>
          <Heading
            style={{
              color: '#1d1c1d',
              fontSize: '36px',
              fontWeight: '700',
              margin: '30px 0',
              padding: '0',
              lineHeight: '42px',
            }}
          >
            Your verification code
          </Heading>
          <Text>
            Welcome to my new Amplify app! Verify your email to get started.
          </Text>
        </Section>
        <Section
          style={{
            background: 'rgb(245, 244, 245)',
            borderRadius: '4px',
            marginRight: '50px',
            marginBottom: '30px',
            padding: '43px 23px',
          }}
        >
          <Text
            style={{
              fontSize: '30px',
              textAlign: 'center' as const,
              verticalAlign: 'middle',
            }}
          >
            {code}
          </Text>
        </Section>
      </Container>
    </Body>
    // </Html>
  )
}

export function renderVerificationEmail(props: VerificationEmailProps) {
  return render(<VerificationEmail {...props} />)
}
