import type { LoaderFunctionArgs } from "@remix-run/node";
import type { Message } from "@/services/database.server";
import { eventStream } from "remix-utils/sse/server";
import { emitter } from "@/services/emitter.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return eventStream(request.signal, (send) => {
    const handle = (message: Message) => send({
      event: "new-message",
      data: message.id
    })
    emitter.on("message", handle)
    return () => emitter.off("new-message", handle)
  })
}