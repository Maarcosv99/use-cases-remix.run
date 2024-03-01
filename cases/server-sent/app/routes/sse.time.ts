import type { LoaderFunctionArgs } from "@remix-run/node"
import { eventStream } from "remix-utils/sse/server"

export const loader = ({ request }: LoaderFunctionArgs) => {
  return eventStream(request.signal, (send) => {
    const timer = setInterval(() => {
      send({ event: "time", data: new Date().toISOString() })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  })
}