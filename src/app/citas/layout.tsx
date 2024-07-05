import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }
  return <main>{children}</main>;
}
