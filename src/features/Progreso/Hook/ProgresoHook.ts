import { getProgresoByModuloId, getProgresoMe } from "../Service/ProgresoService";
import { useQuery } from "@tanstack/react-query";

export function useProgresoQuery(moduloId: string) {
    return useQuery({
        queryKey: ["progreso", moduloId],
        queryFn: () => getProgresoByModuloId(moduloId),
        enabled: !!moduloId,
    });
}

export function useProgresoMeQuery() {
    return useQuery({
        queryKey: ["progreso", "me"],
        queryFn: () => getProgresoMe(),
    });
}