"use client";
import { deleteEvent } from "@/Events/actions";
import { Button } from "../ui/button";
import { Services, Event } from "@prisma/client";
import { useRouter } from "next/navigation";

type EventWithRelations = Event & {
  service: Services;
};

interface EventCardProps {
  events: EventWithRelations[];
}

export const EventCard = ({ events }: EventCardProps) => {
  const router = useRouter();
  const onCancel = async (id: string) => {
    try {
      await deleteEvent(id);
    } catch (e) {
      console.error(e);
    } finally {
      router.refresh();
    }
  };
  return (
    <div className="border rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Tus Citas</h2>
      <div className="space-y-4 max-h-56 overflow-y-scroll">
        {!events.length && (
          <p className="text-gray-500">No tienes citas programadas</p>
        )}
        {events.map((event) => {
          const { id, clientId, start, end, serviceId, comment, service } =
            event;
          const { name, duration, price } = service;

          return (
            <div key={id} className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{name}</h3>
                <p className="text-gray-500">
                  {start.toLocaleDateString("es-EC", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-500">
                  {start.toLocaleTimeString()} - {end.toLocaleTimeString()}
                </p>
              </div>
              <div>
                {/* <Button variant="outline" size="sm">
                          Editar
                        </Button> */}
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-2"
                  onClick={() => onCancel(id)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
