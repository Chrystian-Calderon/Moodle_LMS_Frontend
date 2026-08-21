import { apiService } from "@/api/api";
import {
    CategoriasResponseType,
    CursoCreateType,
    CursoDetailType,
    CursoType,
    CursoUpdateType,
    CursosResponseType,
    MisCursoInscritoType,
} from "../Schema/CursoSchema";

interface GetCursosParams {
    page?: number;
    limit?: number;
    search?: string;
    categoria?: string;
}

export async function GetPaginatedCourses({
    page = 1, limit = 10, search, categoria,
}: GetCursosParams): Promise<CursosResponseType> {

    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    if (search?.trim()) {
        params.set("search", search.trim());
    }

    if (categoria) {
        params.set("categoria", categoria);
    }

    const response = await apiService.get(`/curso?${params.toString()}`);

    return response.data;
}

export async function GetCourseById(id: string): Promise<CursoType> {
    const response = await apiService.get(`/curso/${id}`);

    return response.data;
}

export async function GetCourseCategories(): Promise<CategoriasResponseType> {
    const response = await apiService.get("/curso/cat/categorias");

    return response.data;
}

export async function CreateCurso(data: CursoCreateType): Promise<CursoDetailType> {
    const response = await apiService.post("/curso", data);
    return response.data;
}

export async function UpdateCurso(id: string, data: CursoUpdateType): Promise<CursoDetailType> {
    const response = await apiService.patch(`/curso/${id}`, data);
    return response.data;
}

export async function DeleteCurso(id: string): Promise<ResponseType> {
    const response = await apiService.delete(`/curso/${id}`);
    return response.data;
}

export async function GetMisCursosInscritos(estudianteId: string): Promise<MisCursoInscritoType[]> {
    const response = await apiService.get(`/inscripciones/estudiante/${estudianteId}`);
    return response.data;
}