import { Views } from "react-big-calendar";

export const EVEN_STATUS_COLORS = {
  PENDING: "#FFD700",
  CONFIRMED: "#008000",
  CANCELLED: "#FF0000",
};

export const VIEW_OPTIONS = [
  { id: Views.DAY, label: "Día" },
  { id: Views.WEEK, label: "Semana" },
  { id: Views.MONTH, label: "Mes" },
];

export const EVENT_COLORS = [
  { id: 1, color: "#FFD700" },
  { id: 2, color: "#008000" },
  { id: 3, color: "#FF0000" },
  { id: 4, color: "#0000FF" },
  { id: 5, color: "#FFA500" },
];

export const CLIENT_EVENT_COLOR = [
  { thisUser: true, color: "#008000", fontColor: "#ffffff" },
  { thisUser: false, color: "#4A249D", fontColor: "#ffffff" },
];
