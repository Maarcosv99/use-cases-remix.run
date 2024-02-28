import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Summary" }];
};

export default function Page() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="sm:w-[500px] space-y-3">
        Work here
      </div>
    </main>
  );
}