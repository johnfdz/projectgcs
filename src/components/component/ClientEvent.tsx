import { Event, Services, User } from "@prisma/client";

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
  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  );
}
