import type { ActionFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { themeSessionResolver } from "@/utils/theme/resolver"

export const action = async ({ request }: ActionFunctionArgs) => {
	if (request.method !== "PUT") throw json({
		success: "false",
		message: "Invalid method",
	},{ status: 404 })
	
	const formData = await request.clone().formData()
	if (formData.get("intent") !== "update-theme") throw json({
		success: "false",
		message: "Invalid intent"
	},{ status: 404 })

	const formTheme = formData.get("theme")
	if (formTheme === undefined) throw json({
		success: "false",
		message: "Invalid theme",
	}, { status: 404 })

	const themeResolver = await themeSessionResolver({ request })
	
	return json(null, {
		headers: {"Set-Cookie": await themeResolver.update(formTheme as any) }
	})
}
