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
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

moment.locale("es");
const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

export const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectEvent, setSelectEvent] = useState<Event | null>(null);

  const handleSelectSlot = (slotInfo: any) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };
  const handleSelectedEvent = (event: any) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(event.title);
  };

  const saveEvent = () => {
    if (eventTitle && selectedDate) {
      if (selectEvent) {
        const updatedEvent = { ...selectEvent, title: eventTitle };
        const updatedEvents = events.map((event) =>
          event === selectEvent ? updatedEvent : event
        );
        setEvents(updatedEvents);
      } else {
        const newEvent = {
          title: eventTitle,
          start: selectedDate,
          end: moment(selectedDate).add(1, "hours").toDate(),
        };
        setEvents([...events, newEvent]);
      }
      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
    }
  };

  const deleteEvents = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents(updatedEvents);
      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
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
              <Label htmlFor="eventTitle">Event Title</Label>
              <Input
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                id="eventTitle"
                placeholder="Enter event title"
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
                  setEventTitle("");
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
