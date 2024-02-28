import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";

import { Badge } from "@workspace/ui";

export const meta: MetaFunction = () => {
  return [{ title: "No Cached Layout Nested Page" }];
};

export const loader = async () => {
  const data = () => new Promise<{ hello: string }>((resolve) => {
    setTimeout(() => resolve({ hello: "world" }), 5000)
  })

  return json({ result: await data() })
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
      <div className="w-full rounded border border-dashed bg-purple-800 border-purple-900 text-purple-300 p-2">
        {JSON.stringify(loaderData)}
      </div>
    </>
  )
}