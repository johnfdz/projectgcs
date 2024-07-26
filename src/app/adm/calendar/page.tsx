import AdminCalendar from "@/components/component/admin-calendar";
import { getEvents } from "@/Events/actions";

export default async function CalendarPage() {
  const events = await getEvents();
  return (
    <div className="w-full">
      <AdminCalendar events={events} />
    </div>
  );
}
