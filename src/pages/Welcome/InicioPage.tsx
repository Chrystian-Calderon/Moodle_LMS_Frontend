import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, GraduationCap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Banner } from "@/components/common/Banner";
import { QueryState } from "@/components/common/QueryState";

import { useCursos, useCategoriasCursos } from "@/features/Curso/Hook/CursoHook";
import { usePermission } from "@/hooks/usePermission";
import { PERMISSIONS } from "@/utils/constants";

export default function InicioPage() {
    const { can } = usePermission();

    const [categoriaActiva, setCategoriaActiva] = useState("");

    const { data: categorias = [] } = useCategoriasCursos();
    const { data, isLoading, isError, error } = useCursos(1, 12, "", categoriaActiva);

    const cursos = data?.data ?? [];
    const totalCursos = data?.meta.total;

    return (
        <div className="space-y-8 p-6">
            <Banner
                title="Sigue aprendiendo hoy"
                description="Explora el catálogo completo o retoma un curso donde lo dejaste."
                icon={<GraduationCap />}
                ctaLabel="Ver catálogo completo"
                ctaTo="/cursos"
            />

            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight">Cursos disponibles</h2>
                        {totalCursos !== undefined && (
                            <p className="text-xs text-muted-foreground">{totalCursos} cursos publicados</p>
                        )}
                    </div>

                    {can(PERMISSIONS.CURSOS.CREAR) && (
                        <Link to="/cursos">
                            <Button type="button" variant="outline" size="sm" className="gap-1.5">
                                <Plus className="h-3.5 w-3.5" />
                                Nuevo curso
                            </Button>
                        </Link>
                    )}
                </div>

                {categorias.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => setCategoriaActiva("")}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${categoriaActiva === ""
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/70"
                                }`}
                        >
                            Todas
                        </button>

                        {categorias.map((categoria) => (
                            <button
                                key={categoria.id}
                                type="button"
                                onClick={() => setCategoriaActiva(categoria.slug)}
                                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${categoriaActiva === categoria.slug
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                                    }`}
                            >
                                {categoria.nombre}
                            </button>
                        ))}
                    </div>
                )}

                <QueryState isLoading={isLoading} isError={isError} error={error} minHeight="min-h-[200px]">
                    {cursos.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            {cursos.map((curso) => (
                                <Link
                                    key={curso.id}
                                    to={`/cursos/${curso.id}`}
                                    className="group overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
                                >
                                    <div className="aspect-[3/4] w-full overflow-hidden bg-muted">
                                        {curso.rutaPortada ? (
                                            <img
                                                src={curso.rutaPortada}
                                                alt={curso.nombre}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center p-3 text-center text-xs text-muted-foreground">
                                                {curso.nombre}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-2.5">
                                        {curso.categoria?.nombre && (
                                            <p className="truncate text-[11px] font-medium text-primary">{curso.categoria.nombre}</p>
                                        )}
                                        <h3 className="mt-0.5 line-clamp-2 text-xs font-semibold leading-snug text-foreground">
                                            {curso.nombre}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[200px] items-center justify-center rounded-xl border bg-muted/20">
                            <p className="text-sm text-muted-foreground">No hay cursos en esta categoría.</p>
                        </div>
                    )}
                </QueryState>
            </div>
        </div>
    );
}