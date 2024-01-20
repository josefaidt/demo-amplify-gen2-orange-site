import { renderVerificationEmail } from "./verification-email"

export const render = (code: string) => renderVerificationEmail({ code })
