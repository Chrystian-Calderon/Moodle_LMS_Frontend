import { LeccionItem } from "./LeccionCard";
import { LeccionListItemType } from "../Schema/LeccionSchema";
import { useGetLecciones } from "../Hook/LeccionHook";
import { QueryState } from "@/components/common/QueryState";

interface LeccionesListProps {
    moduloId: string;
    search: string;
    onEditar?: (leccion: LeccionListItemType) => void;
    onEliminar?: (leccion: LeccionListItemType) => void;
    puedeEditar?: boolean;
    puedeEliminar?: boolean;
}

export function LeccionesList({
    moduloId,
    search,
    onEditar,
    onEliminar,
    puedeEditar = false,
    puedeEliminar = false,
}: LeccionesListProps) {
    const {
        data: lecciones,
        isLoading,
        isError,
        error,
    } = useGetLecciones(moduloId, {
        nombre: search || undefined,
    });

    if (!lecciones || lecciones.length === 0) {
        return (
            <QueryState
                isLoading={isLoading}
                isError={isError}
                error={error}
                minHeight="min-h-[200px]"
            >
                <div className="flex min-h-[200px] items-center justify-center rounded-xl border bg-muted/20">
                    <p className="text-sm text-muted-foreground">
                        No hay lecciones que coincidan con tu búsqueda.
                    </p>
                </div>
            </QueryState>
        );
    }

    return (
        <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
            minHeight="min-h-[200px]"
        >
            <div className="space-y-3">
                {lecciones.map((leccion) => (
                    <LeccionItem
                        key={leccion.id}
                        leccion={leccion}
                        onEditar={onEditar}
                        onEliminar={onEliminar}
                        puedeEditar={puedeEditar}
                        puedeEliminar={puedeEliminar}
                    />
                ))}
            </div>
        </QueryState>
    );
}