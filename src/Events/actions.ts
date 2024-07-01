"use server";

import { EmailTemplate } from "@/components/emails/NewEventEmail";
import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const getEvents = async () => {
  const events = await prisma.event.findMany({
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
    });
  }

  return event;
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
