import { Calendar } from "@/components";
import { getEvents } from "@/Events/actions";

export default async function NuevaCitaPage() {
  const events = await getEvents();
  return <Calendar events={events} />;
}
