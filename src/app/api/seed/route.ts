import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.services.createMany({
    data: [
      {
        name: "Corte de cabello",
        duration: 1,
        price: 15.0,
      },
      {
        name: "Manicure",
        duration: 2,
        price: 20.0,
      },
      {
        name: "Pedicure",
        duration: 2,
        price: 12.0,
      },
      {
        name: "Depilación",
        duration: 3,
        price: 25.0,
      },
      {
        name: "Maquillaje",
        duration: 5,
        price: 200.0,
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        email: "admin@admin.com",
        name: "Admin",
        password: bcrypt.hashSync("123456"),
        role: "ADMIN",
      },
      {
        email: "user@user.com",
        name: "User",
        password: bcrypt.hashSync("123456"),
        role: "CLIENT",
      },
    ],
  });

  return NextResponse.json({ message: "Created seed" });
}
