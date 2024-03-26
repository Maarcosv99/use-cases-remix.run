import { useFetcher, useRouteLoaderData } from "@remix-run/react"
import { THEME } from "./types"

export function useTheme(): [THEME | undefined, (theme: THEME) => void] {
	const fetcher = useFetcher()
	const rootLoaderData = useRouteLoaderData<{ theme?: THEME }>('root')

	const handleThemeChange = (theme: THEME) => {
		const formData = new FormData()
		formData.set("intent", "update-theme")
		formData.set("theme", theme)
		fetcher.submit(formData, {
			action: "/action/theme",
			method: "PUT",
		})
	}

	return [rootLoaderData?.theme, handleThemeChange]
}
