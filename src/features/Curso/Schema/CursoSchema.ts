import z from "zod";
import { createPaginatedResponseSchema } from "@/utils/Schema/Response";

export const CursoSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    categoria: z.string().nullable(),
    slug: z.string(),
    descripcionCorta: z.string().nullable(),
    descripcionCompleta: z.string().nullable(),
    duracionHoras: z.number().nullable(),
    rutaPortada: z.string().nullable(),
    rutaImagenSecundaria: z.string().nullable(),
    estado: z.string(),
    creadoPor: z.string().nullable(),
    creadoEn: z.string(),
    actualizadoEn: z.string(),
});

export type CursoType = z.infer<typeof CursoSchema>;

export const CursosResponseSchema = createPaginatedResponseSchema(CursoSchema);

export type CursosResponseType = z.infer<typeof CursosResponseSchema>;

export const CategoriasResponseSchema = z.array(z.string());

export type CategoriasResponseType = z.infer<typeof CategoriasResponseSchema>;

export const CursoDetailResponseSchema = CursoSchema;

export type CursoDetailType = z.infer<typeof CursoDetailResponseSchema>;


export const CursoCreateSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    categoria: z.string().optional(),
    slug: z.string().min(1, "El slug es obligatorio"),
    descripcionCorta: z.string().optional(),
    descripcionCompleta: z.string().optional(),
    duracionHoras: z.number().int().min(1, "La duración debe ser mayor a 0").optional(),
    portada: z.instanceof(File).optional(),
    imagenSecundaria: z.instanceof(File).optional(),

    estado: z.string().optional(),
    creadoPor: z.string().optional(),
});

export type CursoCreateType = z.infer<typeof CursoCreateSchema>;

export const CursoUpdateSchema = CursoCreateSchema.partial();

export type CursoUpdateType = z.infer<typeof CursoUpdateSchema>;