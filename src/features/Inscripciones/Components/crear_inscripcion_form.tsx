import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Plus } from "lucide-react";
import {
    CrearInscripcionSchema,
    CrearInscripcionSchemaType,
    CursoType,
} from "../Schema/InscripcionSchema";
import {
    useCrearInscripcion,
    useCursos,
    useEstudiantes,
} from "../Hook/InscripcionHook";
import { DialogEstudiante } from "./DialogEstudiante";
import { EstudianteType } from "../Schema/EstudianteSchema";

interface CrearInscripcionFormProps {
    onSuccess?: () => void;
    showHeader?: boolean;
}

export function CrearInscripcionForm({ onSuccess, showHeader = true }: CrearInscripcionFormProps) {
    const crearInscripcionMutation = useCrearInscripcion(onSuccess);
    const { data: cursos = [], isLoading: loadingCursos } = useCursos();
    const { data: estudiantes = [], isLoading: loadingEstudiantes } = useEstudiantes();
    const [cursoId, setCursoId] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<CrearInscripcionSchemaType>({
        resolver: zodResolver(CrearInscripcionSchema),
        defaultValues: {
            estadoAcceso: "pendiente",
            cursoId: "",
            moduloId: "",
            estudianteIds: [],
        },
    });

    const cursoSeleccionado = cursos.find(
        (curso: CursoType) => curso.id === cursoId
    );

    const modulos = cursoSeleccionado?.modulos ?? [];
    const cursoOptions = cursos.map((curso: CursoType) => ({
        value: curso.id,
        label: curso.nombre,
    }));
    const moduloOptions = modulos.map((modulo: CursoType) => ({
        value: modulo.id,
        label: modulo.nombre,
    }));
    const estudianteOptions = estudiantes.map((estudiante: EstudianteType) => ({
        value: estudiante.id,
        label: estudiante.username,
    }));

    const onSubmit = (data: CrearInscripcionSchemaType) => {
        crearInscripcionMutation.mutate(data);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-3">
                            <Field>
                                <FieldLabel htmlFor="cursoId">Curso</FieldLabel>
                                <Controller
                                    name="cursoId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            options={cursoOptions}
                                            value={cursoOptions.find(
                                                (option: any) => option.value === field.value
                                            ) ?? null}
                                            onChange={(option) => {
                                                const nuevoCursoId = option ? option.value : null;
                                                field.onChange(nuevoCursoId);
                                                setCursoId(nuevoCursoId);
                                                setValue("moduloId", "");
                                            }}
                                            isLoading={loadingCursos}
                                            placeholder="Selecciona un curso"
                                            isClearable
                                        />
                                    )}
                                />
                                {errors.cursoId && (
                                    <span className="text-sm text-red-500">
                                        {errors.cursoId.message}
                                    </span>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="moduloId">Módulo</FieldLabel>
                                <Controller
                                    name="moduloId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            options={moduloOptions}
                                            value={moduloOptions.find(
                                                (option: any) => option.value === field.value
                                            ) ?? null}
                                            onChange={(option) => {
                                                field.onChange(option ? option.value : null);
                                            }}
                                            isLoading={loadingCursos}
                                            placeholder={cursoSeleccionado ? "Selecciona un módulo" : "Selecciona un curso primero"}
                                            isDisabled={!cursoSeleccionado}
                                            isClearable
                                        />
                                    )}
                                />
                                {errors.moduloId && (
                                    <span className="text-sm text-red-500">
                                        {errors.moduloId.message}
                                    </span>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="estudianteId">Estudiante</FieldLabel>
                                <div className="flex gap-2 w-full">
                                    <Controller
                                        name="estudianteIds"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                className="flex-1"
                                                options={estudianteOptions}
                                                value={estudianteOptions.filter((option: any) => field.value.includes(option.value))}
                                                onChange={(option) => {
                                                    field.onChange(
                                                        option.map((option) => option.value)
                                                    )
                                                }}
                                                isLoading={loadingEstudiantes}
                                                isMulti
                                                placeholder="Selecciona un estudiante"
                                                closeMenuOnSelect={false}
                                            />
                                        )}
                                    />
                                    <Button type="button" variant="outline" size="icon" onClick={() => setOpenDialog(true)} className="cursor-pointer">
                                        <Plus className="size-4" />
                                    </Button>
                                </div>
                                {errors.estudianteIds && (
                                    <span className="text-sm text-red-500">
                                        {errors.estudianteIds.message}
                                    </span>
                                )}
                            </Field>

                            <Field>
                                <Button
                                    type="submit"
                                    disabled={crearInscripcionMutation.isPending}
                                >
                                    {crearInscripcionMutation.isPending
                                        ? "Creando..."
                                        : "Crear Inscripción"}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </div>
            </div>
            <DialogEstudiante open={openDialog} onOpenChange={setOpenDialog} />
        </div>
    );
}
