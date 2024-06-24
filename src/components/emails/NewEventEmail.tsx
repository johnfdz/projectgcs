import { Event, Services } from "@prisma/client";
interface EmailTemplateProps {
  Event: Event;
  Service: Services;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Event,
  Service,
}) => (
  <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mb-4">
      ¡Cita confirmada para:{" "}
      <span className="text-blue-500">{Service.name}</span>!
    </h1>

    <div className="text-lg mb-2">
      <p>
        <span className="font-semibold">Fecha:</span>{" "}
        {Event.start.toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>

    <div className="text-lg mb-2">
      <p>
        <span className="font-semibold">Hora:</span>{" "}
        {Event.start.toLocaleTimeString("es-ES", {
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
    </div>

    <div className="text-lg mb-2">
      <p>
        <span className="font-semibold">Duración:</span> {Service.duration}
      </p>
    </div>

    <div className="text-lg">
      <p>
        <span className="font-semibold">Comentario:</span>{" "}
        {Event.comment || "Sin comentario"}
      </p>
    </div>
  </div>
);
