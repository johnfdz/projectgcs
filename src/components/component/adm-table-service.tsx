"use client";
import { Services } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ModalService } from "./modal-service";
import { useState } from "react";

interface TableServicesProps {
  services: Services[];
}

export const AdmTableServices: React.FC<TableServicesProps> = ({
  services,
}) => {
  const router = useRouter();
  const getVariant = (status: boolean) => {
    switch (status) {
      case true:
        return "secondary";
      case false:
        return "destructive";
      default:
        return "outline";
    }
  };

  const [open, setOpen] = useState(false);
  const [service, setService] = useState<Services>({
    id: 0,
    name: "",
    price: 0,
    status: false,
    duration: 0,
    createdAt: new Date(),
  });

  const onEdit = (id: number) => {
    const selectedService = services.find((s) => s.id === id);
    setService(selectedService!);
    setOpen(true);
  };

  const onClose = () => {
    setService({
      id: 0,
      name: "",
      price: 0,
      status: false,
      duration: 0,
      createdAt: new Date(),
    });
    setOpen(false);
    router.refresh();
  };

  const onNew = () => {
    setService({
      id: 0,
      name: "",
      price: 0,
      status: false,
      duration: 0,
      createdAt: new Date(),
    });
    setOpen(true);
  };

  return (
    <>
      <ModalService
        open={open}
        onClose={onClose}
        service={service}
        setService={setService}
      />
      <div className="flex gap-4">
        <Button onClick={() => onNew()}>Crear Nuevo Servicio</Button>
      </div>
      <div className="border rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Servicios Disponibles</h2>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Duracion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map(({ id, name, price, status, duration }) => (
                <TableRow key={id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>
                    <Badge variant={getVariant(status)}>
                      {status ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {price.toLocaleString("es-EC", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                  <TableCell>{duration}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(id)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
