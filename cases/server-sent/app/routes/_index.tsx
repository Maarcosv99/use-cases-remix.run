import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { ChevronRightIcon } from "lucide-react";

export const meta: MetaFunction = () => {
  return [{ title: "Summary" }];
};

export default function Page() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="sm:w-[500px] space-y-3">
        <div className="w-full  grid grid-cols-1 gap-y-5">
          <CaseItem
            title="Time"
            description="Use server-sent to update the date and time on the screen every second."
            link="/time"
          />
          <CaseItem
            title="Chat"
            description="Open 2 tabs in your browser, and use server-sent events along with Node.js EventEmitter to communicate through the chat."
            link="/chat"
          />
        </div>

        <div className="w-full bg-orange-200 border-orange-600 border border-dashed p-2">
          <p className="font-medium text-orange-800">Tip</p>
          <p className="text-sm text-orange-700">
            Seed database before use chat.
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