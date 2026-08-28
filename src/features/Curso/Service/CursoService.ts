import { apiService } from "@/api/api";
import {
    CategoriaCreateType,
    CategoriaType,
    CategoriasResponseType,
    CursoCreateType,
    CursoDetailType,
    CursoType,
    CursoUpdateType,
    CursosResponseType,
    MisCursoInscritoType,
} from "../Schema/CursoSchema";
import { buildFormData } from "@/utils/buildFormData";

interface GetCursosParams {
    page?: number;
    limit?: number;
    search?: string;
    categoriaId?: string;
}

export async function GetPaginatedCourses({
    page = 1, limit = 10, search, categoriaId,
}: GetCursosParams): Promise<CursosResponseType> {

    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    if (search?.trim()) {
        params.set("search", search.trim());
    }

    if (categoriaId) {
        params.set("categoriaId", categoriaId);
    }

    const response = await apiService.get(`/curso?${params.toString()}`);

    return response.data;
}

export async function GetCourseById(id: string): Promise<CursoType> {
    const response = await apiService.get(`/curso/${id}`);

    return response.data;
}

export async function GetCourseCategories(): Promise<CategoriasResponseType> {
    const response = await apiService.get("/categoria");
    return response.data;
}

export async function GetCourseSubCategories(categoriaId: string): Promise<CategoriasResponseType> {
    const response = await apiService.get(`/categoria/${categoriaId}/subcategorias`);
    return response.data;
}

export async function CreateCurso(data: CursoCreateType): Promise<CursoDetailType> {
    const formData = buildFormData({
        nombre: data.nombre,
        categoriaId: data.categoriaId,
        slug: data.slug,
        descripcionCorta: data.descripcionCorta,
        descripcionCompleta: data.descripcionCompleta,
        estado: data.estado,
        duracionHoras: data.duracionHoras,
        creadoPor: data.creadoPor,
        rutaPortada: data.portada,
        rutaImagenSecundaria: data.imagenSecundaria,
    });
    const response = await apiService.post("/curso", formData);
    return response.data;
}

export async function UpdateCurso(id: string, data: CursoUpdateType): Promise<CursoDetailType> {
    const formData = buildFormData({
        nombre: data.nombre,
        categoriaId: data.categoriaId,
        slug: data.slug,
        descripcionCorta: data.descripcionCorta,
        descripcionCompleta: data.descripcionCompleta,
        estado: data.estado,
        duracionHoras: data.duracionHoras,
        creadoPor: data.creadoPor,
        rutaPortada: data.portada,
        rutaImagenSecundaria: data.imagenSecundaria,
    });
    const response = await apiService.patch(`/curso/${id}`, formData);
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

export async function CreateCategoria(data: CategoriaCreateType): Promise<CategoriaType> {
    const response = await apiService.post("/categoria", data);
    return response.data;
}