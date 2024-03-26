import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { themeSessionResolver } from "@/utils/theme/resolver"

import "@workspace/ui/src/globals.css"

export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;600;700&display=swap",
  }
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const themeResolver = await themeSessionResolver({ request })
	return json({ theme: await themeResolver.get() })
}

export default function App() {
	const data = useLoaderData<typeof loader>()

  return (
    <html lang="en" className={data.theme ?? ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
				<Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

