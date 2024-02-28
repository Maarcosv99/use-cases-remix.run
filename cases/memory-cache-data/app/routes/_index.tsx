import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { ChevronRightIcon } from "lucide-react"

export const meta: MetaFunction = () => {
  return [{ title: "Summary" }];
};

export default function Page() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="sm:w-[500px] space-y-3">
        <div className="w-full  grid grid-cols-1 grid-rows-3 gap-y-5">
          <CaseItem
            title="Cached page"
            description="This page expects the loader only on the first access. After loading the first time, subsequent requests will return the cached loader data until it's refreshed when it reaches the specified lifespan."
            link="/cached"
          />

          <CaseItem
            title="Uncached page"
            description="This page, unlike the one above, won't cache the loader data. So, every time the page is accessed, it will load after waiting for the loader to return the information."
            link="/no-cached"
          />

          <CaseItem
            title="Layout with cache + cached page"
            description="This page works similarly to the first case, but on this page, only the layout uses the cache. Therefore, all its child pages will be loaded based on their own strategy."
            link="/layout/cached"
          />

          <CaseItem
            title="Layout with cache + uncached page"
            description="This page doesn't cache the loader data from the child page, so even though the layout is using caching, you'll still need to wait for the child page's loader to load completely."
            link="/layout/no-cached"
          />

          <CaseItem
            title="Layout with cache + page with streaming response and uncached."
            description="This page demonstrates that the layout is using caching. It's better demonstrated because we're using a streaming response on the child page."
            link="/layout/defer"
          />
        </div>

        <div className="w-full bg-orange-200 border-orange-600 border border-dashed p-2">
          <p className="font-medium text-orange-800">Tip</p>
          <p className="text-sm text-orange-700">
            Track the requests in the devtools and notice that on pages with caching, no requests are made upon accessing if you've already accessed them once before.
          </p>
        </div>
      </div>
    </main>
  );
}


function CaseItem({ title, description, link }: { title: string, description: string, link: string }) {
  return (
    <Link to={link} className="w-full grid grid-cols-[0.8fr,0.2fr] gap-5 p-2 border rounded bg-zinc-50 hover:bg-zinc-200 transition-colors place-content-center">
      <div className="w-full space-y-">
        <h2 className="text-lg font-semibold text-zinc-900">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
      </div>
      <div className="w-full h-full flex items-center justify-end">
        <ChevronRightIcon className="w-6 h-6 stroke-zinc-700" />
      </div>
    </Link>
  )
}