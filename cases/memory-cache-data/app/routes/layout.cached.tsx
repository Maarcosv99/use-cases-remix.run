import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import type { ClientLoaderFunctionArgs } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { cache } from "@/utils/cache"
import { Badge } from "@workspace/ui";

export const meta: MetaFunction = () => {
  return [{ title: "Cached Layout Nested Page" }];
};

export const loader = async () => {
  const data = () => new Promise<{ hello: string }>((resolve) => {
    setTimeout(() => resolve({ hello: "world" }), 5000)
  })

  return json({ result: await data() })
}

let isInitialRequest = true

export const clientLoader = async ({ serverLoader }: ClientLoaderFunctionArgs) => {
  const cacheKey = "hello"

  if (isInitialRequest) {
    isInitialRequest = false
    const serverData = await serverLoader()
    cache.set(cacheKey, JSON.stringify(serverData))
    return serverData
  }

  const cachedData = cache.get(cacheKey)
  if (cachedData) return JSON.parse(cachedData as string)

  const serverData = await serverLoader()
  cache.set(cacheKey, JSON.stringify(serverData))
  return serverData
}

clientLoader.hydrate = true

export default function Page() {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold text-purple-800">
          Nested page:
        </h2>

        <Badge className="bg-transparent border-purple-800 text-purple-800">{isInitialRequest ? "No cached" : "Cached"}</Badge>
      </div>
      <div className="w-full rounded border border-dashed bg-purple-800 border-purple-900 text-purple-300 p-2">
        {JSON.stringify(loaderData)}
      </div>
    </>
  )
}