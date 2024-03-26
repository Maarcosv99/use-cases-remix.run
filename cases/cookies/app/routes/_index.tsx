import type { MetaFunction } from "@remix-run/node";

import { SunIcon, MoonIcon } from "lucide-react"
import { useTheme } from "@/utils/theme/hook"
import { THEME } from "@/utils/theme/types"

export const meta: MetaFunction = () => {
  return [{ title: "Summary" }];
};


export default function Page() {
	const [theme, setTheme] = useTheme()

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <div className="sm:w-[500px] flex items-center gap-3">
				{theme === THEME.LIGHT
					? <SunIcon onClick={() => setTheme(THEME.DARK)} className="w-5 h-5 cursor-pointer" />
					: <MoonIcon onClick={() => setTheme(THEME.LIGHT)} className="w-5 h-5 cursor-pointer" />
				}

				{theme === THEME.LIGHT ? "Claro" : "Escuro"}
      </div>
    </main>
  );
}
