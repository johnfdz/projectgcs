import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.services.createMany({
    data: [
      {
        id: 1,
        name: "Corte de cabello",
        duration: 1,
        price: 150,
      },
      {
        id: 2,
        name: "Manicure",
        duration: 2,
        price: 200,
      },
      {
        id: 3,
        name: "Pedicure",
        duration: 2,
        price: 200,
      },
      {
        id: 4,
        name: "Depilación",
        duration: 3,
        price: 200,
      },
      {
        id: 5,
        name: "Maquillaje",
        duration: 5,
        price: 200,
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        email: "admin@admin.com",
        name: "Admin",
        password: bcrypt.hashSync("administrator"),
        role: "ADMIN",
      },
      {
        email: "user@user.com",
        name: "User",
        password: bcrypt.hashSync("user10"),
        role: "CLIENT",
      },
    ],
  });

  return NextResponse.json({ message: "Created seed" });
}
