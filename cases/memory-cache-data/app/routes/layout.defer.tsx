import type { MetaFunction } from "@remix-run/node";
import { defer } from "@remix-run/node"
import { useLoaderData, Await } from "@remix-run/react";
import { Suspense } from "react";

import { Badge } from "@workspace/ui";
import { Loader2Icon } from "lucide-react";

export const meta: MetaFunction = () => {
  return [{ title: "No Cached Layout Nested Page" }];
};

export const loader = () => {
  const data = () => new Promise<{ hello: string }>((resolve) => {
    setTimeout(() => resolve({ hello: "world" }), 5000)
  })

  return defer({ result: data() })
}

export default function Page() {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold text-purple-800">
          Nested page:
        </h2>

        <Badge className="bg-transparent border-purple-800 text-purple-800">No cached</Badge>
      </div>

      <Suspense fallback={(
        <div className="flex items-center gap-x-2">
          <Loader2Icon className="w-4 h-4 animate-spin" />
          Loading...
        </div>
      )}>
        <Await resolve={loaderData.result}>
          {(result) => (
            <div className="w-full rounded border border-dashed bg-purple-800 border-purple-900 text-purple-300 p-2">
              {JSON.stringify(result)}
            </div>
          )}
        </Await>
      </Suspense>
    </>
  )
}