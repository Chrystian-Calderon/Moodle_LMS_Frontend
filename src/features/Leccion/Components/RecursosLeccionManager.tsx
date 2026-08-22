"use client";

import { useState } from "react";
import { Plus, Trash2, FileText, Link as LinkIcon, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateRecursoLeccion, useDeleteRecursoLeccion, useGetRecursosLeccion } from "../Hook/LeccionHook";
import { QueryState } from "@/components/common/QueryState";


interface RecursosLeccionManagerProps {
    leccionId: string;
}

const TIPOS = [
    { value: "pdf", label: "PDF", icon: Paperclip },
    { value: "enlace", label: "Enlace", icon: LinkIcon },
    { value: "archivo", label: "Archivo", icon: FileText },
];

export function RecursosLeccionManager({ leccionId }: RecursosLeccionManagerProps) {
    const {
        data: recursos,
        isLoading,
        isError,
        error,
    } = useGetRecursosLeccion(leccionId);

    const { mutate: crear, isPending: creando } = useCreateRecursoLeccion();
    const { mutate: eliminar } = useDeleteRecursoLeccion();

    const [nombre, setNombre] = useState("");
    const [tipoRecurso, setTipoRecurso] = useState("enlace");
    const [urlExterna, setUrlExterna] = useState("");

    const handleAgregar = () => {
        if (!nombre.trim()) return;

        crear(
            { leccionId, data: { nombre, tipoRecurso, urlExterna: urlExterna || undefined } },
            {
                onSuccess: () => {
                    setNombre("");
                    setUrlExterna("");
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
                            const Icono = TIPOS.find((t) => t.value === recurso.tipoRecurso)?.icon ?? FileText;

                            return (
                                <div key={recurso.id} className="flex items-center justify-between gap-2 rounded-md bg-background px-3 py-2 text-sm">
                                    <div className="flex min-w-0 items-center gap-2">
                                        <Icono className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                        <span className="truncate">{recurso.nombre}</span>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                        onClick={() => eliminar(recurso.id)}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground">Sin recursos aún.</p>
                )}
            </QueryState>

            <div className="grid grid-cols-1 gap-2 border-t pt-3 sm:grid-cols-[1fr_120px_1fr_auto]">
                <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del recurso" className="h-9" />

                <Select value={tipoRecurso} onValueChange={setTipoRecurso}>
                    <SelectTrigger className="h-9">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {TIPOS.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>
                                {tipo.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input value={urlExterna} onChange={(e) => setUrlExterna(e.target.value)} placeholder="URL" className="h-9" />

                <Button type="button" size="icon" className="h-9 w-9" onClick={handleAgregar} disabled={creando}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}