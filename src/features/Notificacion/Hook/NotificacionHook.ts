import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  ContarNoLeidas,
  GetMisNotificaciones,
  MarcarComoLeida,
} from "../Service/NotificacionService";

export function useGetNotificaciones() {
  return useQuery({
    queryKey: ["notificaciones"],
    queryFn: GetMisNotificaciones,
  });
}

export function useContarNoLeidas() {
  return useQuery({
    queryKey: ["notificaciones-no-leidas"],
    queryFn: ContarNoLeidas,
  });
}

export function useMarcarComoLeida() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificacionId: string) =>
      MarcarComoLeida(notificacionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notificaciones"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notificaciones-no-leidas"],
      });
    },
  });
}