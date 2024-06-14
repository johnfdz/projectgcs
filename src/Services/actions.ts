import prisma from "@/lib/prisma";

export const getServices = async () => {
  const services = await prisma.services.findMany();
  return services;
};
