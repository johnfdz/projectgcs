import { Event, Services } from "@prisma/client";
interface EmailTemplateProps {
  Event: Event;
  Service: Services;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Event,
  Service,
}) => (
  <div>
    <h1>Su cita para: {Service.name} a sido agendada con exito!</h1>
    <p>Fecha: {Event.start.getDate()}</p>
    <p>Hora: {Event.start.getHours()}</p>
    <p>Duración: {Service.duration}</p>
    <p>Precio: {Service.price}</p>
    <p>Comentario: {Event.comment}</p>
  </div>
);
