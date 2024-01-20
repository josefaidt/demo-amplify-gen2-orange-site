"use client"
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react"
import "@aws-amplify/ui-react/styles.css"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
	const { route } = useAuthenticator((context) => [context.route])
	const router = useRouter()

	useEffect(() => {
		if (route === "authenticated") {
			router.push("/")
		}
	}, [route, router])

	return (
		<div className="flex justify-center min-h-screen">
			<Authenticator
				signUpAttributes={["email", "preferred_username"]}
			></Authenticator>
		</div>
	)
}
