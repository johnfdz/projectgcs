import { Event, Services, User } from "@prisma/client";
import { CLIENT_EVENT_COLOR } from "./constants";

type EventWithRelations = Event & {
  service: Services;
  client: User;
};

export default function ClientEventComponent({
  event,
  thisUser,
}: {
  event: EventWithRelations;
  thisUser: boolean;
}) {
  const { id, clientId, start, end, serviceId, comment, service } = event;
  const { name, duration, price } = service;
  const colors = CLIENT_EVENT_COLOR.find(
    (color) => color.thisUser === thisUser
  );
  if (thisUser) {
    return (
      <div
        className="flex items-center space-x-4 h-full px-2"
        style={{ backgroundColor: colors?.color, color: colors?.fontColor }}
      >
        <div className="flex flex-col">
          <span>
            {start.toLocaleTimeString()} - {end.toLocaleTimeString()}
          </span>
          <span className="font-bold">{name}</span>
          <span>{`${duration} horas`}</span>
          <span>{comment}</span>
          <span>${price}</span>
        </div>
      </div>
    );
  }
  return (
    <div
      className="flex items-center space-x-4 h-full px-2"
      style={{ backgroundColor: colors?.color, color: colors?.fontColor }}
    >
      <div className="flex flex-col">
        <span>
          {start.toLocaleTimeString()} - {end.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
