import { getEvents } from "@/Events/actions";
import { getServices } from "@/Services/actions";
import "@/components/component/styles/general-calendar.css";
import ClientCalendar from "@/components/component/client-calendar";

export default async function NuevaCitaPage() {
  const events = await getEvents();
  const services = await getServices();

  return (
    <div className="w-full">
      <ClientCalendar events={events} services={services} />
    </div>
  );
}
