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

  return (
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
                // onClick={() => onConfirm(id)}
              >
                Editar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
