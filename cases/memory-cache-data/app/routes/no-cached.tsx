import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react";

import { Button, Badge } from "@workspace/ui"
import { ChevronLeftIcon } from "lucide-react";

export const meta: MetaFunction = () => {
  return [{ title: "No Cached Page" }];
};

export const loader = async () => {
  const data = () => new Promise<{ hello: string }>((resolve) => {
    setTimeout(() => resolve({ hello: "world" }), 5000)
  })

  return json({ result: await data() })
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="sm:w-[500px] space-y-3">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button type="button" variant="outline" size="icon">
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-medium font-semibold text-zinc-800">
              Data no cached:
            </h1>
          </div>
          <div className="flex items-center justify-end">
            <Badge variant="outline">No cached</Badge>
          </div>
        </div>

        <div className="w-full rounded border border-dashed border-green-600 p-2 text-green-900 bg-green-500">
          {JSON.stringify(loaderData)}
        </div>
      </div>
    </main>
  );
}
