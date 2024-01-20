import cn from "clsx"
import type { PropsWithChildren } from "react"

export type ContentProps = PropsWithChildren<{}>

export default function Content({ children }: ContentProps) {
	return (
		<div
			className={cn("flex flex-1 flex-col gap-4", "py-4 px-2", "bg-stone-50")}
		>
			<main>{children}</main>
		</div>
	)
}
