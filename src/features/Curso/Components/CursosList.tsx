// features/Curso/Components/CursosList.tsx
import { useState } from "react";

import { Button } from "@/components/ui/button";


import { CursoItem } from "./CursoCard";
import { useCursos } from "../Hook/CursoHook";
import { CursoType } from "../Schema/CursoSchema";
import { QueryState } from "@/components/common/QueryState";

interface CursosListProps {
    search: string;
    categoria: string;

    onVer?: (curso: CursoType) => void;
    onEditar?: (curso: CursoType) => void;
    onEliminar?: (curso: CursoType) => void;

    puedeEditar?: boolean;
    puedeEliminar?: boolean;
}

export function CursosList({
    search,
    categoria,
    onVer,
    onEditar,
    onEliminar,
    puedeEditar = false,
    puedeEliminar = false,
}: CursosListProps) {
    const [page, setPage] = useState(1);
    const limit = 10;

    const {
        data,
        isLoading,
        isError,
        error,
    } = useCursos(page, limit, search, categoria);

    return (
        <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
        >
            {(() => {
                const cursos = data?.data ?? [];
                const meta = data?.meta;

                return (
                    <div className="space-y-5">
                        {cursos.length > 0 ? (
                            <div className="grid gap-5 lg:grid-cols-2">
                                {cursos.map((curso) => (
                                    <CursoItem
                                        key={curso.id}
                                        curso={curso}
                                        onVer={onVer}
                                        puedeEditar={puedeEditar}
                                        puedeEliminar={puedeEliminar}
                                        onEditar={onEditar}
                                        onEliminar={onEliminar}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex min-h-[280px] items-center justify-center rounded-xl border bg-muted/20">
                                <p className="text-sm text-muted-foreground">
                                    No existen cursos que coincidan con tu búsqueda.
                                </p>
                            </div>
                        )}

                        {meta && meta.totalPages > 1 && (
                            <div className="flex items-center justify-between border-t pt-5">
                                <p className="text-sm text-muted-foreground">
                                    Página {meta.page} de {meta.totalPages}
                                </p>

                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        disabled={meta.page <= 1}
                                        onClick={() =>
                                            setPage((prev) => Math.max(prev - 1, 1))
                                        }
                                    >
                                        Anterior
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        disabled={meta.page >= meta.totalPages}
                                        onClick={() =>
                                            setPage((prev) => prev + 1)
                                        }
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })()}
        </QueryState>
    );
}