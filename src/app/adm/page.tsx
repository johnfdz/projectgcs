import { AdmTableEvent } from "@/components/component/adm-table-event";
import { getEvents } from "@/Events/actions";

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr] lg:gap-12 xl:grid-cols-[1fr]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Administración de Citas
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Aquí puedes ver y administrar las citas programadas de tus
                clientes.
              </p>
            </div>
          </div>
          <div className="border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Citas Programadas</h2>
            <div className="overflow-auto">
              <AdmTableEvent events={events} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
