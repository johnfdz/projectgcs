import { AdmTableServices } from "@/components/component/adm-table-service";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

export default async function ServicesPage() {
  const services = await prisma.services.findMany();
  return (
    <>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr] lg:gap-12 xl:grid-cols-[1fr]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Servicios
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Aquí puedes ver y administrar los servicios que ofrece la
                peluquería.
              </p>
            </div>
            <div className="flex gap-4">
              <Button>Crear Nuevo Servicio</Button>
            </div>
          </div>
          <div className="border rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Servicios Disponibles</h2>
            <div className="overflow-auto">
              <AdmTableServices services={services} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
