import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.services.createMany({
    data: [
      {
        name: "Corte de cabello",
        duration: 30,
        price: 150,
      },
      {
        name: "Manicure",
        duration: 60,
        price: 200,
      },
      {
        name: "Pedicure",
        duration: 60,
        price: 200,
      },
      {
        name: "Depilación",
        duration: 60,
        price: 200,
      },
      {
        name: "Maquillaje",
        duration: 60,
        price: 200,
      },
    ],
  });

  return NextResponse.json({ message: "Created seed" });
}
