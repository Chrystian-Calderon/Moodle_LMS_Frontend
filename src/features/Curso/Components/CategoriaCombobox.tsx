"use client";

import { useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCategoriasCursos, useCreateCategoria } from "../Hook/CursoHook";
import { CategoriaType } from "../Schema/CursoSchema";

function generarSlug(texto: string): string {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

type CategoriaComboboxProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
};

export function CategoriaCombobox<TFieldValues extends FieldValues>({
    control,
    name,
    label = "Categoría",
}: CategoriaComboboxProps<TFieldValues>): React.JSX.Element {
    const [open, setOpen] = useState<boolean>(false);
    const [modoCrear, setModoCrear] = useState<boolean>(false);
    const [nombreNuevo, setNombreNuevo] = useState<string>("");

    const { data: categorias, isLoading } = useCategoriasCursos();
    const { mutate: crearCategoria, isPending: creando } = useCreateCategoria();

    const {
        field: { value, onChange },
    } = useController<TFieldValues>({ control, name });

    const categoriaSeleccionada = categorias?.find(
        (categoria: CategoriaType) => categoria.id === value,
    );

    const handleCrear = (): void => {
        const nombre = nombreNuevo.trim();
        if (!nombre) return;

        crearCategoria(
            { nombre, slug: generarSlug(nombre) },
            {
                onSuccess: (nueva: CategoriaType) => {
                    onChange(nueva.id);
                    setNombreNuevo("");
                    setModoCrear(false);
                    setOpen(false);
                },
            },
        );
    };

    return (
        <div className="flex flex-col gap-2">
            {label && <Label>{label}</Label>}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between font-normal"
                    >
                        {categoriaSeleccionada?.nombre ?? "Seleccionar categoría..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    {modoCrear ? (
                        <div className="flex flex-col gap-2 p-3">
                            <Label className="text-xs text-muted-foreground">Nueva categoría</Label>
                            <Input
                                autoFocus
                                value={nombreNuevo}
                                onChange={(e) => setNombreNuevo(e.target.value)}
                                placeholder="Ej: Maquillaje"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleCrear();
                                    }
                                }}
                            />
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    className="flex-1"
                                    disabled={!nombreNuevo.trim() || creando}
                                    onClick={handleCrear}
                                >
                                    {creando ? "Creando..." : "Crear"}
                                </Button>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setModoCrear(false)}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Command>
                            <CommandInput placeholder="Buscar categoría..." />
                            <CommandList>
                                <CommandEmpty>
                                    <button
                                        type="button"
                                        className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                                        onClick={() => setModoCrear(true)}
                                    >
                                        <Plus className="h-4 w-4" />
                                        No se encontró. Crear nueva categoría.
                                    </button>
                                </CommandEmpty>

                                <CommandGroup>
                                    {isLoading && (
                                        <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                            Cargando...
                                        </div>
                                    )}

                                    {categorias?.map((categoria: CategoriaType) => (
                                        <CommandItem
                                            key={categoria.id}
                                            value={categoria.nombre}
                                            onSelect={() => {
                                                onChange(categoria.id);
                                                setOpen(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === categoria.id ? "opacity-100" : "opacity-0",
                                                )}
                                            />
                                            {categoria.nombre}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>

                                <div className="border-t p-1">
                                    <button
                                        type="button"
                                        className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                                        onClick={() => setModoCrear(true)}
                                    >
                                        <Plus className="h-4 w-4" />
                                        Agregar nueva categoría
                                    </button>
                                </div>
                            </CommandList>
                        </Command>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
}