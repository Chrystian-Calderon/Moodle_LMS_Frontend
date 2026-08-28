import { apiService } from "@/api/api";

export interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  tipo?: string;
  enlace?: string;
  fechaCreacion: string;
}

export async function GetMisNotificaciones(): Promise<Notificacion[]> {
  const response = await apiService.get("/notificaciones");
  return response.data;
}

export async function ContarNoLeidas(): Promise<number> {
  const response = await apiService.get("/notificaciones/no-leidas");
  return response.data;
}

export async function MarcarComoLeida(notificacionId: string): Promise<void> {
  await apiService.get(`/notificaciones/${notificacionId}/marcar-como-leida`);
}
