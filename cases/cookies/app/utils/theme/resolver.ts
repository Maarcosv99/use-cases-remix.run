import { createCookie } from "@remix-run/node"
import type { THEME } from "./types"

export const themeCookie = createCookie("remix__theme", {
	path: "/",
	sameSite: "lax",
	secure: true,
	maxAge: 600_802, // one Week
	secrets: ["secr3t"]
})

export const themeSessionResolver = async ({ request }: { request: Request }) => ({
	get: async () => await themeCookie.parse(request.headers.get("Cookie")) as THEME | undefined,
	update: async (input: THEME) => await themeCookie.serialize(input)
})
