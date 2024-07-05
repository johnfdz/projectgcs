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

type EventWithRelations = Event & {
  service: Services;
  client: User;
};

interface AdmTableEventProps {
  events: EventWithRelations[];
}

export const AdmTableEvent = ({ events }: AdmTableEventProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Servicio</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map(({ id, client, service, status }) => (
          <TableRow key={id}>
            <TableCell>{service.name}</TableCell>
            <TableCell>
              <Badge variant="destructive">{status}</Badge>
            </TableCell>
            <TableCell>{client.name}</TableCell>
            <TableCell>
              {/* <Button variant="outline" size="sm">
                Editar
              </Button> */}
              <Button variant="destructive" size="sm" className="ml-2">
                Cancelar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
