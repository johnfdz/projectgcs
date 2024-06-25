"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
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
import moment from "moment";
import "moment/locale/es";
import { Event, Services } from "@prisma/client";
import { createEvent, deleteEvent } from "@/Events/actions";
import { useRouter } from "next/navigation";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSession } from "next-auth/react";

moment.locale("es");
const localizer = momentLocalizer(moment);

interface Props {
  events: Event[];
  services: Services[];
}

export const MyCalendar = ({ events = [], services = [] }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedService, setSelectedService] = useState<Services | null>(null);
  const [eventDescription, setEventDescription] = useState("");
  const [eventComment, setEventComment] = useState("");
  const [selectEvent, setSelectEvent] = useState<Event | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSelectSlot = ({ start, end }: any) => {
    setShowModal(true);
    setSelectEvent(null);
    setSelectedService(null);
    setEventComment("");
    setSelectedDate(start);
  };

  const handleSelectedEvent = async (event: Event) => {
    setShowModal(true);
    setSelectEvent(event);
    setSelectedService(
      services.find((service) => service.id === event.serviceId) || null
    );
    setEventComment(event.comment);
  };

  const saveEvent = async () => {
    try {
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
          const start = moment(selectedDate).toDate();
          const end = moment(selectedDate)
            .add(selectedService.duration, "hours")
            .toDate();
          const overlappingEvent = events.some(
            (event) =>
              (start >= event.start && start < event.end) ||
              (end > event.start && end <= event.end) ||
              (start <= event.start && end >= event.end)
          );

          if (overlappingEvent) {
            alert("Ya existe una cita en este rango de tiempo.");
            return;
          }
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
          await createEvent(
            newEvent.comment,
            newEvent.start,
            newEvent.end,
            newEvent.serviceId,
            newEvent.clientId,
            newEvent.clientEmail
          );
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

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        views={["week", "day"]}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
        onSelecting={(slotInfo) => {
          console.log(slotInfo);
          return true;
        }}
        defaultView="week"
        min={moment("2024-01-01T09:00:00").toDate()}
        max={moment("2024-01-01T18:00:00").toDate()}
        timeslots={1}
        step={60}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectedEvent}
        allDayMaxRows={1}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          showMore: (total) => `+${total} más`,
        }}
        onRangeChange={(range) => console.log(range)}
      />

      <Dialog open={showModal} onOpenChange={setShowModal}>
        {/* <DialogTrigger asChild>
              <Button>Add Event</Button>
            </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
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
                    {selectedService ? selectedService.name : "Select Service"}
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
                Delete
              </Button>
            )}
            <Button onClick={saveEvent}>Add</Button>

            <div>
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false);
                  setEventDescription("");
                  setSelectEvent(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
