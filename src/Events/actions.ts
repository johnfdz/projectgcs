"use server";

import { EmailTemplate } from "@/components/emails/NewEventEmail";
import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const getEvents = async () => {
  const events = await prisma.event.findMany();
  return events;
};

export const createEvent = async (
  comment: string,
  start: Date,
  end: Date,
  serviceId: string,
  clientId: string,
  userEmail: string
): Promise<Event | Object> => {
  const event = await prisma.event.create({
    data: { comment, start, end, serviceId, clientId },
  });
  const service = await prisma.services.findUnique({
    where: { id: event.serviceId },
  });
  if (event && service) {
    const resend = new Resend();
    await resend.emails.send({
      from: "Salon Chic <onboarding@resend.dev>",
      to: [userEmail],
      subject: "Nueva Cita",
      react: EmailTemplate({ Event: event, Service: service }),
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
