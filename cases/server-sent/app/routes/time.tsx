import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEventSource } from "remix-utils/sse/react";

import { Clock1Icon } from "lucide-react";

export const loader = () => {
  return json({ time: new Date().toISOString() });
}

export default function Time() {
  const loaderData = useLoaderData<typeof loader>();
  const time = useEventSource("/sse/time", { event: "time" }) ?? loaderData.time;

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="p-3 bg-zinc-50 rounded border flex items-center space-x-3">
        <Clock1Icon className="w-6 h-6 stroke-zinc-700" />
        <p className="text-lg font-medium text-zinc-800">{new Date(time).toLocaleTimeString("en", {
          minute: "2-digit",
          second: "2-digit",
          hour: "2-digit",
        })}</p>
      </div>
    </div>
  );
}
