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
    console.log("DATA DEL FORMULARIO:", data);
    console.log("PORTADA:", data.portada);
    console.log("ES FILE:", data.portada instanceof File);

    const formData = buildCursoFormData(data);

    console.log("FORM DATA:");

    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }
    const response = await apiService.post("/curso", formData);
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

function buildCursoFormData(
    data: CursoCreateType | CursoUpdateType,
): FormData {
    const formData = new FormData();

    if (data.nombre !== undefined) {
        formData.append("nombre", data.nombre);
    }

    if (data.categoria !== undefined) {
        formData.append("categoria", data.categoria);
    }

    if (data.slug !== undefined) {
        formData.append("slug", data.slug);
    }

    if (data.descripcionCorta !== undefined) {
        formData.append(
            "descripcionCorta",
            data.descripcionCorta,
        );
    }

    if (data.descripcionCompleta !== undefined) {
        formData.append(
            "descripcionCompleta",
            data.descripcionCompleta,
        );
    }

    if (data.estado !== undefined) {
        formData.append("estado", data.estado);
    }

    if (
        data.duracionHoras !== undefined &&
        data.duracionHoras !== null
    ) {
        formData.append(
            "duracionHoras",
            String(data.duracionHoras),
        );
    }

    if (data.creadoPor !== undefined) {
        formData.append(
            "creadoPor",
            data.creadoPor,
        );
    }

    if (data.portada instanceof File) {
        formData.append(
            "rutaPortada",
            data.portada,
        );
    }

    if (data.imagenSecundaria instanceof File) {
        formData.append(
            "rutaImagenSecundaria",
            data.imagenSecundaria,
        );
    }

    return formData;
}