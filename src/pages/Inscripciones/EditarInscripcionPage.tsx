import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { BookOpen, Layers, Trash2, ArrowLeft, Plus, User, Calendar, BarChart3 } from "lucide-react";
import {
  useGetInscripcionesPorEstudiante,
  useCursos,
  useEliminarModulo,
  useEliminarCurso,
  useAgregarCurso,
} from "@/features/Inscripciones/Hook/InscripcionHook";
import { CursoType } from "@/features/Inscripciones/Schema/InscripcionSchema";
import { DialogConfirmarEliminarModulo } from "@/features/Inscripciones/Components/DialogConfirmarEliminarModulo";

interface ModuloAEliminar {
  inscripcionId: string;
  cursoId: string;
  cursoNombre: string;
  moduloId: string;
  moduloNombre: string;
}

interface LocationState {
  nombreCompleto?: string;
}

export default function EditarInscripcionPage() {
  const { estudianteId } = useParams<{ estudianteId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const nombreCompleto = state?.nombreCompleto ?? "";

  const {
    data: cursosInscritos = [],
    isLoading,
    isError,
    error,
  } = useGetInscripcionesPorEstudiante(estudianteId ?? "");

  const { data: todosCursos = [], isLoading: loadingCursos } = useCursos();
  const eliminarModuloMutation = useEliminarModulo();
  const eliminarCursoMutation = useEliminarCurso();
  const agregarCursoMutation = useAgregarCurso();

  const [cursoIdSeleccionado, setCursoIdSeleccionado] = useState<string | null>(null);
  const [moduloIdSeleccionado, setModuloIdSeleccionado] = useState<string | null>(null);
  const [moduloAEliminar, setModuloAEliminar] = useState<ModuloAEliminar | null>(null);
  const [cursoAEliminar, setCursoAEliminar] = useState<{ id: string; nombre: string } | null>(null);

  const cursosInscritosIds = cursosInscritos.map((c: CursoType) => c.id);
  const cursosDisponibles = todosCursos.filter(
    (curso: CursoType) => !cursosInscritosIds.includes(curso.id)
  );

  const cursoSeleccionado = todosCursos.find(
    (curso: CursoType) => curso.id === cursoIdSeleccionado
  );

  const modulos = cursoSeleccionado?.modulos ?? [];

  const cursoOptions = cursosDisponibles.map((curso: CursoType) => ({
    value: curso.id,
    label: curso.nombre,
  }));

  const moduloOptions = modulos.map((modulo: any) => ({
    value: modulo.id,
    label: modulo.nombre,
  }));

  const handleAgregarCurso = () => {
    if (!estudianteId || !cursoIdSeleccionado || !moduloIdSeleccionado) return;

    agregarCursoMutation.mutate(
      {
        cursoId: cursoIdSeleccionado,
        moduloId: moduloIdSeleccionado,
        estudianteIds: [estudianteId],
        estadoAcceso: "habilitado",
      },
      {
        onSuccess: () => {
          setCursoIdSeleccionado(null);
          setModuloIdSeleccionado(null);
        },
      }
    );
  };

  const handleConfirmEliminarModulo = () => {
    if (!moduloAEliminar) return;

    eliminarModuloMutation.mutate(
      {
        inscripcionId: moduloAEliminar.inscripcionId,
        cursoId: moduloAEliminar.cursoId,
        moduloId: moduloAEliminar.moduloId,
      },
      {
        onSuccess: () => {
          setModuloAEliminar(null);
        },
      }
    );
  };

  const handleConfirmEliminarCurso = () => {
    if (!cursoAEliminar || !estudianteId) return;

    eliminarCursoMutation.mutate(
      {
        estudianteId: estudianteId,
        cursoId: cursoAEliminar.id,
      },
      {
        onSuccess: () => {
          setCursoAEliminar(null);
        },
      }
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/inscripciones")}
            className="cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <AppTitle
            title="Editar Inscripción"
            subtitle="Gestiona los cursos y módulos de la inscripción."
          />
        </div>
      </div>

      <QueryState isLoading={isLoading} isError={isError} error={error}>
        <div className="space-y-6">
          {/* Current Courses */}
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Cursos inscritos ({cursosInscritos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cursosInscritos.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No tiene cursos inscritos
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {nombreCompleto && (
                    <div className="text-sm text-muted-foreground">
                      Estudiante: <span className="font-medium">{nombreCompleto}</span>
                    </div>
                  )}
                  {cursosInscritos.map((curso: CursoType) => (
                    <Card key={curso.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            {curso.nombre}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive cursor-pointer"
                            onClick={() => setCursoAEliminar({ id: curso.id, nombre: curso.nombre })}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar curso
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{curso.categoria.nombre}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Layers className="h-3 w-3" />
                            Módulos ({curso.modulos.length})
                          </span>
                          <div className="flex flex-col gap-2">
                            {curso.modulos
                              .sort((a: any, b: any) => a.orden - b.orden)
                              .map((modulo: any) => (
                                <div
                                  key={modulo.id}
                                  className="flex items-center justify-between rounded-md border p-3"
                                >
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                      <Badge variant="secondary">Módulo {modulo.orden}</Badge>
                                      <span className="text-sm font-medium">{modulo.nombre}</span>
                                    </div>
                                    {modulo.inscripcion && (
                                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <Calendar className="h-3 w-3" />
                                          {new Date(modulo.inscripcion.fechaInscripcion).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <BarChart3 className="h-3 w-3" />
                                          {modulo.inscripcion.porcentajeAvance}% avance
                                        </span>
                                        <Badge
                                          variant={
                                            modulo.inscripcion.estadoAcceso === "habilitado"
                                              ? "default"
                                              : "secondary"
                                          }
                                        >
                                          {modulo.inscripcion.estadoAcceso}
                                        </Badge>
                                        filterColumn="id"
                                        filterPlaceholder="Buscar por nombre ..."
                                      </div>
                                    )}
                                  </div>
                                  {modulo.inscripcion && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 hover:text-destructive cursor-pointer"
                                      onClick={() =>
                                        setModuloAEliminar({
                                          inscripcionId: modulo.inscripcion!.id,
                                          cursoId: curso.id,
                                          cursoNombre: curso.nombre,
                                          moduloId: modulo.id,
                                          moduloNombre: modulo.nombre,
                                        })
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add Course */}
          {cursosDisponibles.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Plus className="h-4 w-4 text-primary" />
                  Agregar curso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup className="gap-3">
                  <Field>
                    <FieldLabel>Curso</FieldLabel>
                    <Select
                      options={cursoOptions}
                      value={cursoOptions.find((o: any) => o.value === cursoIdSeleccionado) ?? null}
                      onChange={(option) => {
                        setCursoIdSeleccionado(option ? option.value : null);
                        setModuloIdSeleccionado(null);
                      }}
                      isLoading={loadingCursos}
                      placeholder="Selecciona un curso"
                      isClearable
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Módulo</FieldLabel>
                    <Select
                      options={moduloOptions}
                      value={moduloOptions.find((o: any) => o.value === moduloIdSeleccionado) ?? null}
                      onChange={(option) => {
                        setModuloIdSeleccionado(option ? option.value : null);
                      }}
                      isLoading={loadingCursos}
                      placeholder={
                        cursoSeleccionado
                          ? "Selecciona un módulo"
                          : "Selecciona un curso primero"
                      }
                      isDisabled={!cursoSeleccionado}
                      isClearable
                    />
                  </Field>
                  <Field>
                    <Button
                      type="button"
                      onClick={handleAgregarCurso}
                      disabled={
                        !cursoIdSeleccionado ||
                        !moduloIdSeleccionado ||
                        agregarCursoMutation.isPending
                      }
                    >
                      {agregarCursoMutation.isPending ? "Agregando..." : "Agregar curso"}
                    </Button>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          )}
        </div>
      </QueryState>

      {/* Dialog Confirmar Eliminar Módulo */}
      <DialogConfirmarEliminarModulo
        open={!!moduloAEliminar}
        onOpenChange={(open) => {
          if (!open) setModuloAEliminar(null);
        }}
        cursoNombre={moduloAEliminar?.cursoNombre ?? ""}
        moduloNombre={moduloAEliminar?.moduloNombre ?? ""}
        onConfirm={handleConfirmEliminarModulo}
        isPending={eliminarModuloMutation.isPending}
      />

      {/* Dialog Confirmar Eliminar Curso */}
      <DialogConfirmarEliminarModulo
        open={!!cursoAEliminar}
        onOpenChange={(open) => {
          if (!open) setCursoAEliminar(null);
        }}
        cursoNombre={cursoAEliminar?.nombre ?? ""}
        moduloNombre="todos sus módulos"
        onConfirm={handleConfirmEliminarCurso}
        isPending={eliminarCursoMutation.isPending}
      />
    </div>
  );
}
