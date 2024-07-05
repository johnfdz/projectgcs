"use client";
import { useState } from "react";
import {
  Calendar,
  CalendarProps,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import { Services } from "@prisma/client";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("es");
const localizer = momentLocalizer(moment);

interface CustomProps {
  services: Services[];
}

type Props = CustomProps & Omit<CalendarProps, "localizer">;

type Keys = keyof typeof Views;

export const MyCalendar = ({
  // events = [],
  services = [],
  ...otherProps
}: Props) =>
  // props: CalendarProps
  {
    const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);
    const [date, setDate] = useState<Date>(moment(new Date()).toDate());
    return (
      <>
        <div style={{ height: "500px" }}>
          <Calendar
            {...otherProps}
            localizer={localizer}
            date={date}
            view={view}
            onView={(view) => setView(view)}
            onNavigate={(date) => setDate(date)}
            min={moment("2024-01-01T09:00:00").toDate()}
            max={moment("2024-01-01T18:00:00").toDate()}
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
          />
        </div>
      </>
    );
  };
