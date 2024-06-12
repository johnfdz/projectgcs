"use server";

import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";

export const getEvents = async () => {
  const events = await prisma.event.findMany();
  return events;
};

export const createEvent = async (
  name: string,
  start: Date,
  end: Date
): Promise<Event | Object> => {
  const event = await prisma.event.create({ data: { name, start, end } });
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

export const seedEvents = async () => {
  const events = await prisma.event.createMany({
    data: [
      {
        name: "Meeting",
        start: new Date(),
        end: new Date(),
      },
      {
        name: "Meeting 2",
        start: new Date(),
        end: new Date(),
      },
    ],
  });
  return events;
};
