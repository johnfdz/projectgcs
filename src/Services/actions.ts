"use server";
import prisma from "@/lib/prisma";
import { Services } from "@prisma/client";

export const getServices = async () => {
  const services = await prisma.services.findMany();
  return services;
};

export const createService = async (service: Services) => {
  const newService = await prisma.services.create({
    data: service,
  });
  return newService;
};

export const updateService = async (id: number, service: Services) => {
  const updatedService = await prisma.services.update({
    where: { id },
    data: service,
  });
  return updatedService;
};
