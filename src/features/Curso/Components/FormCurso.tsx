"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/common/form/FormField";
import { ImageUpload } from "@/components/common/form/ImageUpload";
import {
    CursoCreateSchema,
    CursoCreateType,
    CursoUpdateSchema,
    CursoUpdateType,
    CursoType,
} from "../Schema/CursoSchema";
import { useCreateCurso, useUpdateCurso } from "../Hook/CursoHook";

type FormValues = CursoCreateType | CursoUpdateType;

type FormCursoProps = {
    initialData?: CursoType;
    mode: "create" | "edit";
    onSuccess?: () => void;
};

const OPCIONES_ESTADO = [
    { value: "publicado", label: "Publicado" },
    { value: "borrador", label: "Borrador" },
    { value: "inactivo", label: "Inactivo" },
];

export function FormCurso({ initialData, mode, onSuccess }: FormCursoProps) {
    const { usuario } = useAuthStore();
    const { mutate: createCurso, isPending: creating } = useCreateCurso();
    const { mutate: updateCurso, isPending: updating } = useUpdateCurso();

    const isPending = creating || updating;

    const form = useForm<FormValues>({
        resolver: zodResolver(mode === "edit" ? CursoUpdateSchema : CursoCreateSchema),
        defaultValues:
            mode === "edit"
                ? {
                    nombre: initialData?.nombre ?? "",
                    categoria: initialData?.categoria ?? "",
                    slug: initialData?.slug ?? "",
                    descripcionCorta: initialData?.descripcionCorta ?? "",
                    descripcionCompleta: initialData?.descripcionCompleta ?? "",
                    duracionHoras: initialData?.duracionHoras ?? undefined,
                    portada: undefined,
                    imagenSecundaria: undefined,
                    estado: initialData?.estado ?? "publicado",
                    creadoPor: usuario?.id ?? "",
                }
                : {
                    nombre: "",
                    categoria: "",
                    slug: "",
                    descripcionCorta: "",
                    descripcionCompleta: "",
                    duracionHoras: undefined,
                    portada: undefined,
                    imagenSecundaria: undefined,
                    estado: "publicado",
                    creadoPor: "",
                },
    });

    const onSubmit = (values: FormValues) => {
        const data = { ...values, creadoPor: usuario?.id ?? "" };

        if (mode === "edit") {
            updateCurso(
                { id: initialData!.id, data: data as CursoUpdateType },
                { onSuccess: () => onSuccess?.() },
            );
            return;
        }

        createCurso(data as CursoCreateType, {
            onSuccess: () => { form.reset(); onSuccess?.(); },
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField control={form.control} name="nombre" label="Nombre del curso" placeholder="Ej: Maquillaje Profesional" />
                    <FormField control={form.control} name="categoria" label="Categoría" placeholder="Ej: Maquillaje" />
                </div>

                <FormField
                    control={form.control}
                    name="slug"
                    label="Slug"
                    placeholder="Ej: maquillaje-profesional"
                    hint="Identificador utilizado para la URL del curso."
                />

                <FormField
                    type="textarea"
                    control={form.control}
                    name="descripcionCorta"
                    label="Descripción corta"
                    placeholder="Escribe una breve descripción del curso..."
                    rows={3}
                />

                <FormField
                    type="textarea"
                    control={form.control}
                    name="descripcionCompleta"
                    label="Descripción completa"
                    placeholder="Describe detalladamente el contenido del curso..."
                    rows={6}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        type="number"
                        control={form.control}
                        name="duracionHoras"
                        label="Duración en horas"
                        min={1}
                        placeholder="Ej: 20"
                        allowEmpty
                    />

                    <FormField
                        type="select"
                        control={form.control}
                        name="estado"
                        label="Estado"
                        placeholder="Seleccionar estado"
                        options={OPCIONES_ESTADO}
                    />
                </div>

                <ImageUpload
                    control={form.control}
                    name="portada"
                    label="Imagen de portada"
                    existingImage={initialData?.rutaPortada}
                    hint="Imagen principal del curso."
                />

                <ImageUpload
                    control={form.control}
                    name="imagenSecundaria"
                    label="Imagen secundaria"
                    existingImage={initialData?.rutaImagenSecundaria}
                    hint="Imagen adicional para el curso."
                />
            </FieldGroup>

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending
                    ? mode === "edit" ? "Guardando..." : "Creando..."
                    : mode === "edit" ? "Guardar cambios" : "Crear curso"}
            </Button>
        </form>
    );
}