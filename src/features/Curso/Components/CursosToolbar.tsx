"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCategoriasCursos } from "../Hook/CursoHook";

interface CursosToolbarProps {
    search: string;
    categoria: string;

    onSearchChange: (value: string) => void;
    onCategoriaChange: (value: string) => void;
    onClear: () => void;
}

export function CursosToolbar({
    search,
    categoria,
    onSearchChange,
    onCategoriaChange,
    onClear,
}: CursosToolbarProps) {

    const {
        data: categorias = [],
        isLoading,
    } = useCategoriasCursos();

    const hayFiltros =
        search.trim() !== "" || categoria !== "";

    return (
        <div className="flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">
                <Search
                    className=" absolute left-3 top-1/2  h-4  w-4  -translate-y-1/2  text-muted-foregroun "
                />

                <Input
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Buscar cursos..."
                    className="h-10 pl-9"
                />
            </div>

            <select
                value={categoria}
                onChange={(event) =>
                    onCategoriaChange(event.target.value)
                }
                disabled={isLoading}
                className=" h-10 min-w-[200px] rounded-md border bg-background px-3 text-sm outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-50
                "
            >
                <option value="">
                    Todas las categorías
                </option>

                {categorias.map((item) => (
                    <option
                        key={item.slug}
                        value={item.id}
                    >
                        {item.nombre}
                    </option>
                ))}
            </select>
            {hayFiltros && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onClear}
                    className="shrink-0"
                    title="Limpiar filtros"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}

        </div>
    );
}