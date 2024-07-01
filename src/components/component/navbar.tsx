"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useUIStore } from "../ui/sidebar/sidebaropen";

export const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);
  const openSideMenu = useUIStore((state) => state.openSideMenu);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <ScissorsIcon className="h-6 w-6" />
        <span className="text-xl font-bold">Salon Chic</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {/* <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Nosotros
        </Link>
        {session ? (
          <>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/citas/nuevacita"
            >
              Agendar Cita
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
              onClick={() => signOut()}
            >
              Cerrar Sesión
            </Link>
          </>
        ) : (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
            onClick={() => signIn()}
          >
            Iniciar Sesión
          </Link>
        )} */}
        <button
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </nav>
    </header>
  );
};

function ScissorsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="3" />
      <path d="M8.12 8.12 12 12" />
      <path d="M20 4 8.12 15.88" />
      <circle cx="6" cy="18" r="3" />
      <path d="M14.8 14.8 20 20" />
    </svg>
  );
}
