"use client";
import { Event, Services, User } from "@prisma/client";
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
import { deleteEvent, confirmEvent } from "@/Events/actions";
import { useRouter } from "next/navigation";

type EventWithRelations = Event & {
  service: Services;
  client: User;
};

interface AdmTableEventProps {
  events: EventWithRelations[];
}

export const AdmTableEvent = ({ events }: AdmTableEventProps) => {
  const router = useRouter();
  const getVariant = (status: string) => {
    switch (status) {
      case "PENDING":
        return "secondary";
      case "CONFIRMED":
        return "default";
      case "CANCELLED":
        return "destructive";
      default:
        return "outline";
    }
  };

  const onConfirm = async (id: string) => {
    try {
      await confirmEvent(id);
    } catch (e) {
      console.error(e);
    } finally {
      router.refresh();
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteEvent(id);
    } catch (e) {
      console.error(e);
    } finally {
      router.refresh();
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Servicio</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Hora</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map(({ id, client, service, status, start, end }) => (
          <TableRow key={id}>
            <TableCell>{service.name}</TableCell>
            <TableCell>
              <Badge variant={getVariant(status)}>{status}</Badge>
            </TableCell>
            <TableCell>{client.name}</TableCell>
            <TableCell>
              {start.toLocaleDateString("es-EC", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
            <TableCell>
              {start.toLocaleTimeString()} - {end.toLocaleTimeString()}
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                disabled={status !== "PENDING"}
                onClick={() => onConfirm(id)}
              >
                Atendida
              </Button>
              <Button
                disabled={status !== "PENDING"}
                variant="destructive"
                size="sm"
                className="ml-2"
                onClick={() => onDelete(id)}
              >
                Cancelar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
