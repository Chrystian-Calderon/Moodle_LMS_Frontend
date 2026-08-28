import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetMisNotificaciones, ContarNoLeidas, MarcarComoLeida } from "../Service/NotificacionService";

export function useGetNotificaciones() {
  return useQuery({
    queryKey: ["notificaciones"],
    queryFn: GetMisNotificaciones,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
  });
}

export function useContarNoLeidas() {
  return useQuery({
    queryKey: ["notificaciones", "no-leidas"],
    queryFn: ContarNoLeidas,
    staleTime: 1000 * 30,
    refetchInterval: 1000 * 30,
  });
}

export function useMarcarComoLeida() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificacionId: string) => MarcarComoLeida(notificacionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificaciones"] });
      queryClient.invalidateQueries({ queryKey: ["notificaciones", "no-leidas"] });
    },
  });
}
