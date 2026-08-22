import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CrearEstudiante } from "../Service/InscripcionService";
import { CrearEstudianteSchemaType } from "../Schema/EstudianteSchema";

export function useCreateEstudiante() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CrearEstudianteSchemaType) => CrearEstudiante(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inscripciones", "estudiantes"],
      });
    },
  });
}