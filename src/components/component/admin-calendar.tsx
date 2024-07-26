"use client";
import React, { FormEvent, useCallback, useState } from "react";
import { Calendar } from "@/components";
import { Services, Event, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import moment from "moment";
import { SlotInfo, Views, EventProps } from "react-big-calendar";
import { ModalGlobal } from "./modal-global";
import AdminEventComponent from "./admin-event";

type EventWithRelations = Event & {
  service: Services;
  client: User;
};

interface CalendarProps {
  events: EventWithRelations[];
}

export default function AdminCalendar({ events }: CalendarProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectEvent, setSelectEvent] = useState<EventWithRelations | null>(
    null
  );
  const router = useRouter();
  const { data: session } = useSession();

  const handleSelectedEvent = (
    event: EventWithRelations,
    e: React.SyntheticEvent<HTMLElement, EventWithRelations>
  ) => {
    e.preventDefault();
    setShowModal(true);
    setSelectEvent(event);
  };

  const components: any = {
    event: ({ event }: EventProps<EventWithRelations>) => {
      const sameUser = event.clientId === session?.user?.id;
      return <AdminEventComponent event={event} />;
    },
  };

  return (
    <>
      <Calendar
        events={events}
        defaultView={Views.WEEK}
        onSelectEvent={(event, e) =>
          handleSelectedEvent(event as EventWithRelations, e as any)
        }
        views={[Views.WEEK, Views.DAY]}
        scrollToTime={new Date()}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
        timeslots={1}
        step={60}
        components={components}
      />
      <ModalGlobal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Cita"
      >
        {selectEvent && (
          <div>
            <Label>Cliente</Label>
            <Input type="text" value={selectEvent.client.name ?? ""} disabled />
            <Label>Fecha</Label>
            <Input
              type="text"
              value={moment(selectEvent.start).format("DD/MM/YYYY")}
              disabled
            />
            <Label>Hora</Label>
            <Input
              type="text"
              value={moment(selectEvent.start).format("HH:mm")}
              disabled
            />
            <Label>Servicio</Label>
            <Input type="text" value={selectEvent.service.name} disabled />
            <Label>Comentario</Label>
            <Input type="text" value={selectEvent.comment} disabled />
            {/* <Button
              onClick={async () => {
                await deleteEvent(selectEvent.id);
                router.reload();
              }}
            >
              Eliminar
            </Button> */}
          </div>
        )}
      </ModalGlobal>
    </>
  );
}
