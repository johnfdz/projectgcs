"use server";

import { EmailTemplate } from "@/components/emails/NewEventEmail";
import prisma from "@/lib/prisma";
import { Event, EventStatus } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const getEvents = async () => {
  const events = await prisma.event.findMany({
    include: { service: true, client: true },
  });
  return events;
};

export const getClientEvents = async (clientId: string) => {
  const events = await prisma.event.findMany({
    where: { clientId, status: EventStatus.PENDING },
    include: { service: true },
  });
  return events;
};

export const createEvent = async (
  comment: string,
  start: Date,
  end: Date,
  serviceId: number,
  clientId: string,
  userEmail: string
): Promise<Event | Object> => {
  try {
    // Verificar eventos superpuestos en la base de datos
    const overlappingEvent = await prisma.event.findMany({
      where: {
        AND: [
          { start: { lt: end } }, // Menor que end
          { end: { gt: start } }, // Mayor que start
        ],
      },
    });

    if (overlappingEvent.length > 0) {
      return { error: "Ya existe una cita en este rango de tiempo." };
    }

    const event = await prisma.event.create({
      data: { comment, start, end, serviceId, clientId },
      include: { service: true },
    });

    if (event) {
      const resend = new Resend();
      await resend.emails.send({
        from: "Salon Chic <onboarding@resend.dev>",
        to: [userEmail],
        subject: "Nueva Cita",
        react: EmailTemplate({ Event: event, Service: event.service }),
        text: "Agendado con éxito!",
      });
    }

    return event;
  } catch (error) {
    return { error: "No se pudo agendar la cita." };
  }
};

export const updateEvent = async (id: string, data: Event) => {
  const event = await prisma.event.update({ where: { id }, data });
  return event;
};

export const deleteEvent = async (id: string) => {
  const event = await prisma.event.delete({ where: { id } });
  return event;
};

export const deleteAllEvents = async () => {
  const events = await prisma.event.deleteMany();
  return events;
};
