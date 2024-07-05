import { auth } from "@/auth";
import { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function AdmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session?.user.role !== $Enums.UserRole.ADMIN) {
    redirect("/auth/login");
  }
  return <main>{children}</main>;
}
