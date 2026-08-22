import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
    CrearInscripcion,
    ObtenerCursos,
    ObtenerEstudiantes,
    ObtenerInscripciones,
    EliminarCursoInscripcion,
    EliminarModuloInscripcion,
} from "../Service/InscripcionService";

export function useCrearInscripcion() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: CrearInscripcion,

        onSuccess: () => {
            toast.success("Inscripción creada exitosamente");

            queryClient.invalidateQueries({
                queryKey: ["inscripciones", "list"],
            });

            navigate("/inscripciones");
        },

        onError: () => {
            toast.error("Error al crear la inscripción");
        },
    });
}

export function useGetInscripciones(page: number, limit: number = 10) {
    return useQuery({
        queryKey: ["inscripciones", "list", page, limit],
        queryFn: () => ObtenerInscripciones(page, limit),
        staleTime: 1000 * 60 * 2,
    });
}

export function useCursos() {
    return useQuery({
        queryKey: ["inscripciones", "cursos"],
        queryFn: ObtenerCursos,
    });
}

export function useEstudiantes() {
    return useQuery({
        queryKey: ["inscripciones", "estudiantes"],
        queryFn: ObtenerEstudiantes,
    });
}

export function useEliminarCurso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            inscripcionId,
            cursoId,
        }: {
            inscripcionId: string;
            cursoId: string;
        }) => EliminarCursoInscripcion(inscripcionId, cursoId),

        onSuccess: () => {
            toast.success("Curso eliminado exitosamente");

            queryClient.invalidateQueries({
                queryKey: ["inscripciones", "list"],
            });
        },

        onError: () => {
            toast.error("Error al eliminar el curso");
        },
    });
}

export function useEliminarModulo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            inscripcionId,
            cursoId,
            moduloId,
        }: {
            inscripcionId: string;
            cursoId: string;
            moduloId: string;
        }) => EliminarModuloInscripcion(inscripcionId, cursoId, moduloId),

        onSuccess: () => {
            toast.success("Módulo eliminado exitosamente");

            queryClient.invalidateQueries({
                queryKey: ["inscripciones", "list"],
            });
        },

        onError: () => {
            toast.error("Error al eliminar el módulo");
        },
    });
}