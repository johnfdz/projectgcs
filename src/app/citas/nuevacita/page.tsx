import { Calendar } from "@/components";
import { getEvents } from "@/Events/actions";
import { getServices } from "@/Services/actions";
import { redirect } from "next/navigation";
import "@/components/component/styles/general-calendar.css";
import { auth } from "@/auth.config";

export default async function NuevaCitaPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const events = await getEvents();
  const services = await getServices();
  return <Calendar events={events} services={services} />;
}
