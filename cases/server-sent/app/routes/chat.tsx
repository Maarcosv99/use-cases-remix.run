import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import { useEventSource } from "remix-utils/sse/react"
import { useLoaderData, Form, useRevalidator } from "@remix-run/react";

import { emitter } from "@/services/emitter.server";
import { database } from "@/services/database.server";
import { useEffect } from "react";

import { Input, Button, ScrollArea } from "@workspace/ui"
import { SendHorizonalIcon } from "lucide-react";

export const loader = async () => {
  const messages = await database.messages.findAll()
  return json({ messages })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.clone().formData()
  const message = formData.get("message") as string
  try {
    const newMessage = await database.messages.create(message)
    emitter.emit("message", newMessage)
    return json(null, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: error.message }, { status: 400 })
    }
    throw error;
  }
}

export default function Chat() {
  const loaderData = useLoaderData<typeof loader>()

  const { revalidate } = useRevalidator()
  const eventSource = useEventSource("/sse/chat", {
    event: "new-message"
  })

  useEffect(() => revalidate(), [eventSource])

  return (
    <div className="w-full min-h-screen bg-zinc-100">
      <div className="w-full h-full p-5">
        <ScrollArea className="h-full">
          <ul id="chat" className="w-full space-y-2 flex flex-col items-start pb-[90px]">
            {loaderData.messages.map((message) => (
              <li key={message.id} className="p-2 bg-slate-100 border border-slate-400 rounded-md w-auto">
                {message.content}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      <div className="w-full p-5 fixed bottom-0 left-0 border-t bg-zinc-50">
        <Form method="post">
          <div className="w-full relative">
            <Input type="text" name="message" id="message" required className="h-10" />
            <Button type="submit" variant="ghost" size="icon" className="p-0 w-7 h-7 absolute top-1/2 right-2 transform -translate-y-1/2">
              <SendHorizonalIcon className="w-5 h-5" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
