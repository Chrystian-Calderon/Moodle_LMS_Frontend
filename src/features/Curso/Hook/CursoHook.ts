import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    CreateCurso,
    DeleteCurso,
    GetCourseById,
    GetCourseCategories,
    GetMisCursosInscritos,
    GetPaginatedCourses,
    UpdateCurso,
} from "../Service/CursoService";

import { CursoCreateType, CursoUpdateType } from "../Schema/CursoSchema";

export function useCursos(
    page: number,
    limit: number,
    search: string = "",
    categoria: string = "",
) {
    return useQuery({
        queryKey: ["cursos", page, limit, search, categoria],
        queryFn: () => GetPaginatedCourses({ page, limit, search, categoria }),
        placeholderData: (previousData) => previousData,
    });
}

export function useGetCurso(id: string, enabled = true) {
    return useQuery({
        queryKey: ["curso", id],
        queryFn: () => GetCourseById(id),
        enabled: enabled && !!id,
    });
}

export function useCategoriasCursos() {
    return useQuery({
        queryKey: ["cursos", "categorias"],
        queryFn: GetCourseCategories,
        staleTime: 1000 * 60 * 10,
    });
}

export function useCreateCurso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CursoCreateType) => CreateCurso(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cursos"],
            });
        },
    });
}

export function useUpdateCurso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: CursoUpdateType;
        }) => UpdateCurso(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["cursos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["curso", variables.id],
            });
        },
    });
}

export function useDeleteCurso() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => DeleteCurso(id),

        onSuccess: (_, id) => {
            queryClient.invalidateQueries({
                queryKey: ["cursos"],
            });

            queryClient.invalidateQueries({
                queryKey: ["curso", id],
            });
        },
    });
}

export function useMisCursosInscritos(estudianteId: string) {
    return useQuery({
        queryKey: ["mis-cursos-inscritos", estudianteId],
        queryFn: () => GetMisCursosInscritos(estudianteId),
        enabled: !!estudianteId,
    });
}