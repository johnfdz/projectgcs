"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSession, signOut } from "next-auth/react";
import {
  IoCalendarClear,
  IoCalendarOutline,
  IoCloseOutline,
  IoHomeOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoTicketOutline,
} from "react-icons/io5";

import { useUIStore } from "./sidebaropen";
import { $Enums } from "@prisma/client";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role === $Enums.UserRole.ADMIN;

  const handleSignOut = async () => {
    closeMenu();
    await signOut({ redirect: false });
    window.location.reload();
  };

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-y-scroll",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={() => closeMenu()}
        >
          <IoHomeOutline size={30} />
          <span className="ml-3 text-xl">Inicio</span>
        </Link>
        <Link
          href="/citas/nuevacita"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={() => closeMenu()}
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Nueva Cita</span>
        </Link>

        {/* Menú */}

        {isAuthenticated && (
          <>
            {/* <Link
              href="/profile"
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link> */}
            <Link
              href="/citas"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Mis citas</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => handleSignOut()}
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeMenu()}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {isAdmin && (
          <>
            {/* Line Separator */}
            <div className="w-full h-px bg-gray-200 my-10" />

            <Link
              href="/adm"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <IoCalendarClear size={30} />
              <span className="ml-3 text-xl">Administar Citas</span>
            </Link>
            <Link
              href="/adm/calendar"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeMenu()}
            >
              <IoCalendarOutline size={30} />
              <span className="ml-3 text-xl">Calendario de Citas</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
