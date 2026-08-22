"use client";

import { useState } from "react";
import {
    Plus,
    Trash2,
    FileText,
    Link as LinkIcon,
    Paperclip,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    useCreateRecursoLeccion,
    useDeleteRecursoLeccion,
    useGetRecursosLeccion,
} from "../Hook/LeccionHook";

import { QueryState } from "@/components/common/QueryState";

interface RecursosLeccionManagerProps {
    leccionId: string;
}

const TIPOS = [
    {
        value: "pdf",
        label: "PDF",
        icon: Paperclip,
    },
    {
        value: "enlace",
        label: "Enlace",
        icon: LinkIcon,
    },
    {
        value: "archivo",
        label: "Archivo",
        icon: FileText,
    },
];

export function RecursosLeccionManager({
    leccionId,
}: RecursosLeccionManagerProps) {
    const {
        data: recursos,
        isLoading,
        isError,
        error,
    } = useGetRecursosLeccion(leccionId);

    const { mutate: crear, isPending: creando } =
        useCreateRecursoLeccion();

    const { mutate: eliminar } = useDeleteRecursoLeccion();

    const [nombre, setNombre] = useState("");
    const [tipoRecurso, setTipoRecurso] = useState("enlace");
    const [urlExterna, setUrlExterna] = useState("");
    const [archivo, setArchivo] = useState<File | undefined>();

    const handleTipoChange = (tipo: string) => {
        setTipoRecurso(tipo);
        setUrlExterna("");
        setArchivo(undefined);
    };

    const handleArchivoChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setArchivo(file);
    };

    const handleAgregar = () => {
        if (!nombre.trim()) return;

        if (tipoRecurso === "enlace" && !urlExterna.trim()) {
            return;
        }

        if (
            (tipoRecurso === "pdf" || tipoRecurso === "archivo") &&
            !archivo
        ) {
            return;
        }

        crear(
            {
                leccionId,
                data: {
                    nombre: nombre.trim(),
                    tipoRecurso,
                    urlExterna:
                        tipoRecurso === "enlace"
                            ? urlExterna.trim()
                            : undefined,
                    archivo:
                        tipoRecurso !== "enlace"
                            ? archivo
                            : undefined,
                },
            },
            {
                onSuccess: () => {
                    setNombre("");
                    setUrlExterna("");
                    setArchivo(undefined);
                },
            },
        );
    };

    return (
        <div className="space-y-3 rounded-lg border bg-muted/10 p-4">
            <p className="text-sm font-medium">Recursos</p>

            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                minHeight="min-h-[50px]"
            >
                {recursos && recursos.length > 0 ? (
                    <div className="space-y-1.5">
                        {recursos.map((recurso) => {
                            const Icono =
                                TIPOS.find(
                                    (t) =>
                                        t.value === recurso.tipoRecurso,
                                )?.icon ?? FileText;

                            return (
                                <div
                                    key={recurso.id}
                                    className="flex items-center justify-between gap-2 rounded-md bg-background px-3 py-2 text-sm"
                                >
                                    <div className="flex min-w-0 items-center gap-2">
                                        <Icono className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />

                                        <span className="truncate">
                                            {recurso.nombre}
                                        </span>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                        onClick={() =>
                                            eliminar(recurso.id)
                                        }
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground">
                        Sin recursos aún.
                    </p>
                )}
            </QueryState>

            <div className="space-y-2 border-t pt-3">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_140px]">
                    <Input
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                        placeholder="Nombre del recurso"
                        className="h-9"
                    />

                    <Select
                        value={tipoRecurso}
                        onValueChange={handleTipoChange}
                    >
                        <SelectTrigger className="h-9">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {TIPOS.map((tipo) => (
                                <SelectItem
                                    key={tipo.value}
                                    value={tipo.value}
                                >
                                    {tipo.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {tipoRecurso === "enlace" && (
                    <Input
                        value={urlExterna}
                        onChange={(e) =>
                            setUrlExterna(e.target.value)
                        }
                        placeholder="https://..."
                        className="h-9"
                    />
                )}

                {(tipoRecurso === "pdf" ||
                    tipoRecurso === "archivo") && (
                        <div className="flex items-center gap-2">
                            <Input
                                type="file"
                                accept={
                                    tipoRecurso === "pdf"
                                        ? "application/pdf"
                                        : undefined
                                }
                                onChange={handleArchivoChange}
                                className="h-9"
                            />

                            {archivo && (
                                <span className="max-w-[200px] truncate text-xs text-muted-foreground">
                                    {archivo.name}
                                </span>
                            )}
                        </div>
                    )}

                <Button
                    type="button"
                    size="sm"
                    className="w-full"
                    onClick={handleAgregar}
                    disabled={creando}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    {creando ? "Agregando..." : "Agregar recurso"}
                </Button>
            </div>
        </div>
    );
}