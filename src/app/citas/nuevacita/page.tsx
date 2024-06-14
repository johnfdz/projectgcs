import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Calendar } from "@/components";
import { getEvents } from "@/Events/actions";
import { getServices } from "@/Services/actions";
import { redirect } from "next/navigation";

export default async function NuevaCitaPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const events = await getEvents();
  const services = await getServices();
  return <Calendar events={events} services={services} />;
}
