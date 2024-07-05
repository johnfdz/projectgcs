import { auth } from "@/auth";
import { EventCard } from "@/components/component/EventCard";
import { Button } from "@/components/ui/button";
import { getClientEvents, deleteEvent } from "@/Events/actions";
import Link from "next/link";

export default async function CitasPage() {
  const session = await auth();

  const events = await getClientEvents(session?.user.id as string);

  return (
    <div className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Tus Citas
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Aquí puedes ver y administrar tus citas programadas.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="/citas/nuevacita"
                >
                  Agendar Cita
                </Link>
              </div>
            </div>
            <EventCard events={events} />
          </div>
        </div>
      </section>
    </div>
  );
}
