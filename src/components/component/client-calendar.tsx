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
import { createEvent, deleteEvent } from "@/Events/actions";
import moment from "moment";
import { SlotInfo, Views, EventProps } from "react-big-calendar";
import ClientEventComponent from "./ClientEvent";

interface CalendarProps {
  events: Event[];
  services: Services[];
}

type EventWithRelations = Event & {
  service: Services;
  client: User;
};

export default function ClientCalendar({ events, services }: CalendarProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<Services | null>(null);
  const [eventDescription, setEventDescription] = useState("");
  const [eventComment, setEventComment] = useState("");
  const [selectEvent, setSelectEvent] = useState<Event | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSelectedEvent = async (
    event: Event,
    e: React.SyntheticEvent<HTMLElement>
  ) => {
    e.preventDefault();
    setShowModal(true);
    setSelectEvent(event);
    setSelectedService(
      services.find((service) => service.id === event.serviceId) || null
    );
    setEventComment(event.comment);
  };

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    if (start < new Date()) {
      return;
    }

    setShowModal(true);
    setSelectEvent(null);
    setSelectedService(null);
    setEventComment("");
    setSelectedDate(start);
  };

  const saveEvent = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (selectedDate) {
        if (selectEvent) {
          // const updatedEvent = { ...selectEvent, title: eventTitle };
          // const updatedEvents = events.map((event) =>
          //   event === selectEvent ? updatedEvent : event
          // );
          // setEvents(updatedEvents);
        } else {
          if (!selectedService) {
            alert("Please select a service");
            return;
          }
          //   const start = moment(selectedDate).toDate();
          //   const end = moment(selectedDate)
          //     .add(selectedService.duration, "hours")
          //     .toDate();
          //   const overlappingEvent = events.some(
          //     (event) =>
          //       (start >= event.start && start < event.end) ||
          //       (end > event.start && end <= event.end) ||
          //       (start <= event.start && end >= event.end)
          //   );

          //   if (overlappingEvent) {
          //     alert("Ya existe una cita en este rango de tiempo.");
          //     return;
          //   }
          const newEvent = {
            comment: eventComment,
            start: selectedDate,
            end: moment(selectedDate)
              .add(selectedService.duration, "hours")
              .toDate(),
            serviceId: selectedService.id,
            clientId: session?.user?.id ?? "",
            clientEmail: session?.user?.email ?? "",
          };
          const event = await createEvent(
            newEvent.comment,
            newEvent.start,
            newEvent.end,
            newEvent.serviceId,
            newEvent.clientId,
            newEvent.clientEmail
          );
          if ("error" in event) {
            alert(event.error);
            return;
          }
        }
        setShowModal(false);
        setEventDescription("");
        setSelectEvent(null);
      }
    } catch (error) {
      alert("Error al guardar la cita");
    } finally {
      router.refresh();
    }
  };

  const deleteEvents = async () => {
    if (selectEvent) {
      await deleteEvent(selectEvent.id);
      setShowModal(false);
      setEventDescription("");
      setSelectEvent(null);
      router.refresh();
    }
  };

  const components: any = {
    event: ({ event }: EventProps<EventWithRelations>) => {
      const sameUser = event.clientId === session?.user?.id;
      return <ClientEventComponent event={event} thisUser={sameUser} />;
    },
  };

  return (
    <>
      <Calendar
        services={services}
        events={events}
        onSelectSlot={handleSelectSlot}
        defaultView={Views.WEEK}
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
      <Dialog open={showModal} onOpenChange={setShowModal}>
        {/* <DialogTrigger asChild>
              <Button>Add Event</Button>
            </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={saveEvent}>
            <DialogHeader>
              <DialogTitle>
                {" "}
                {selectEvent ? "Edit Event" : "Add Event"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="eventTitle">Servicio</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {selectedService
                        ? selectedService.name
                        : "Elija un servicio"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {services.map((service) => (
                      <DropdownMenuItem
                        key={service.id}
                        onClick={() => {
                          setSelectedService(service);
                        }}
                      >
                        {service.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Label htmlFor="eventDescription">Descripcion</Label>
                <Input
                  value={
                    selectedService
                      ? `Nombre: ${selectedService?.name} - Precio: ${selectedService?.price} - Duracion: ${selectedService?.duration}h`
                      : ""
                  }
                  onChange={(e) => setEventDescription(e.target.value)}
                  id="eventDescription"
                  placeholder="Descripcion"
                  disabled
                />
                <Label htmlFor="eventComment">Comentario</Label>
                <Input
                  value={eventComment}
                  onChange={(e) => setEventComment(e.target.value)}
                  id="eventComment"
                  placeholder="Comentario"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              {selectEvent && (
                <Button variant="outline" onClick={() => deleteEvents()}>
                  Eliminar
                </Button>
              )}
              <Button type="submit">Añadir</Button>

              <div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowModal(false);
                    setEventDescription("");
                    setSelectEvent(null);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
