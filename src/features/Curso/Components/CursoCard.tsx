"use client";

import {
    Clock3,
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { CursoType } from "../Schema/CursoSchema";

interface CursoItemProps {
    curso: CursoType;

    onVer?: (curso: CursoType) => void;
    onEditar?: (curso: CursoType) => void;
    onEliminar?: (curso: CursoType) => void;

    puedeEditar?: boolean;
    puedeEliminar?: boolean;
}

export function CursoItem({
    curso,
    onVer,
    onEditar,
    onEliminar,
    puedeEditar = false,
    puedeEliminar = false,
}: CursoItemProps) {
    const mostrarAcciones =
        puedeEditar || puedeEliminar;

    return (
        <article
            onClick={() => onVer?.(curso)}
            className=" group flex w-full cursor-pointer items-center gap-5 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/20 hover:shadow-sm"
        >
            <div
                className=" h-[110px] w-[170px] shrink-0 overflow-hidden rounded-lg bg-muted sm:h-[120px] sm:w-[190px]"
            >
                {curso.rutaPortada ? (
                    <img
                        src={curso.rutaPortada}
                        alt={curso.nombre}
                        className=" h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className=" flex  h-full w-full items-center justify-center text-xs text-muted-foreground "                    >
                        Sin imagen
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1">
                {curso.categoria?.nombre && (
                    <p className="text-xs font-medium text-primary">
                        {curso.categoria.nombre}
                    </p>
                )}

                <h2
                    className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg"
                >
                    {curso.nombre}
                </h2>

                {curso.descripcionCorta && (
                    <p
                        className="mt-2 line-clamp-2 max-w-3xl text-sm leading-relaxed text-muted-foreground"
                    >
                        {curso.descripcionCorta}
                    </p>
                )}

                {curso.duracionHoras !== null && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock3 className="h-3.5 w-3.5" />

                        <span>
                            {curso.duracionHoras}{" "}
                            {curso.duracionHoras === 1
                                ? "hora"
                                : "horas"}
                        </span>
                    </div>
                )}
            </div>

            {mostrarAcciones && (
                <div
                    className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    {puedeEditar && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                onEditar?.(curso)
                            }
                            title="Editar curso"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    )}

                    {puedeEliminar && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                onEliminar?.(curso)
                            }
                            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            title="Eliminar curso"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            )}
        </article>
    );
}