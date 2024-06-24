"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Email y contraseña son requeridos");
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const newUser = await createUser(email, password);
    return newUser;
  }

  if (!bcrypt.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split("@")[0],
    },
  });
  return user;
};

export const getUserServerSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};
