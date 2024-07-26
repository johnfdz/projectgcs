import { Event, Services, User } from "@prisma/client";
import { CLIENT_EVENT_COLOR } from "./constants";

type EventWithRelations = Event & {
  service: Services;
  client: User;
};

export default function AdminEventComponent({
  event,
}: {
  event: EventWithRelations;
}) {
  const { id, clientId, start, end, serviceId, comment, service, client } =
    event;
  const { name, duration, price } = service;
  const { name: clientName } = client;

  return (
    <div className="flex items-center space-x-4 h-full px-2">
      <div className="flex flex-col">
        <span>
          {start.toLocaleTimeString()} - {end.toLocaleTimeString()}
        </span>
        <span className="font-bold">{name}</span>
        <span>{`${duration} horas`}</span>
        <span>{comment}</span>
        <span>{clientName}</span>
        <span>${price}</span>
      </div>
    </div>
  );
}
