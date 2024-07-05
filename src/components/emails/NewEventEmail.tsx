import { Event, Services } from "@prisma/client";
interface EmailTemplateProps {
  Event: Event;
  Service: Services;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Event,
  Service,
}) => (
  <div className="max-w-7xl mx-auto bg-white p-8 shadow-xl rounded-lg border border-gray-200">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">
      ¡Cita confirmada para:{" "}
      <span className="text-blue-600">{Service.name}</span>!
    </h1>

    <div className="text-lg mb-4">
      <p className="mb-2">
        <span className="font-semibold text-gray-700">Fecha:</span>{" "}
        {Event.start.toLocaleDateString("es-ES", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <p className="mb-2">
        <span className="font-semibold text-gray-700">Hora:</span>{" "}
        {Event.start.toLocaleTimeString("es-ES", {
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
      <p className="mb-2">
        <span className="font-semibold text-gray-700">Duración:</span>{" "}
        {Service.duration} minutos
      </p>
      <p className="mb-2">
        <span className="font-semibold text-gray-700">Comentario:</span>{" "}
        {Event.comment || "Sin comentario"}
      </p>
    </div>
  </div>
);
