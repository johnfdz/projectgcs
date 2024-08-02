"use server";
import prisma from "@/lib/prisma";
import { Services } from "@prisma/client";

export const getServices = async () => {
  const services = await prisma.services.findMany();
  return services;
};

export const createService = async (service: Services) => {
  const newService = await prisma.services.create({
    data: {
      name: service.name,
      duration: service.duration,
      price: service.price,
    },
  });
  return newService;
};

export const updateService = async (id: string, service: Services) => {
  const updatedService = await prisma.services.update({
    where: { id },
    data: service,
  });
  return updatedService;
};
