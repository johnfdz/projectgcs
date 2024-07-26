"use client";
import { DialogContent, DialogFooter } from "../ui/dialog";
import { ModalGlobal } from "./modal-global";
import { Services } from "@prisma/client";
import { createService, updateService } from "@/Services/actions";

interface ModalServiceProps {
  open: boolean;
  onClose: () => void;
  service: Services;
  setService: React.Dispatch<React.SetStateAction<Services>>;
}

export const ModalService: React.FC<ModalServiceProps> = ({
  open,
  onClose,
  service,
  setService,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: name === "status" ? checked : value,
    }));
  };

  const onChangeFloat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const validate = () => {
    if (!service.name) {
      alert("El nombre es requerido");
      return false;
    }
    if (!service.duration) {
      alert("La duración es requerida");
      return false;
    }
    if (!service.price) {
      alert("El precio es requerido");
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    if (!service.id) {
      await createService(service);
    } else {
      await updateService(service.id, service);
    }
    onClose();
  };

  return (
    <ModalGlobal open={open} onClose={onClose} title="Servicios">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col space-y-4">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={service.name}
            onChange={onChange}
          />
          <label htmlFor="duration">Duración</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={service.duration}
            onChange={onChangeFloat}
          />
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={service.price}
            onChange={onChangeFloat}
          />
          <label htmlFor="status">Estado</label>
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={service.status}
            onChange={onChange}
          />
        </div>
        <DialogFooter>
          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </DialogFooter>
      </form>
    </ModalGlobal>
  );
};
