import { useState } from "react";
import { QueryState } from "@/components/common/QueryState";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { AppTitle } from "@/components/common/Apptittle";

import { InscripcionColumns } from "@/features/Inscripciones/Components/inscripcion-columns";
import { DialogCursos } from "@/features/Inscripciones/Components/DialogCursos";
import { DialogEliminarInscripcion } from "@/features/Inscripciones/Components/DialogEliminarInscripcion";
import { useGetInscripciones } from "@/features/Inscripciones/Hook/InscripcionHook";
import { InscripcionIndexType } from "@/features/Inscripciones/Schema/InscripcionSchema";

import { usePermission } from "@/hooks/usePermission";
import { useNavigate } from "react-router-dom";
import { PERMISSIONS } from "@/utils/constants";

export const InscripcionesPage = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data, isLoading, isError, error } = useGetInscripciones(page, perPage);

  const navigate = useNavigate();

  const [openDialogCursos, setOpenDialogCursos] = useState(false);
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);

  const [inscripcionSeleccionada, setInscripcionSeleccionada] =
    useState<InscripcionIndexType | null>(null);

  const { can } = usePermission();

  const puedeCrear = can(PERMISSIONS.INSCRIPCIONES.CREAR);
  const puedeEliminar = can(PERMISSIONS.INSCRIPCIONES.ELIMINAR);

  const handleViewCursos = (inscripcion: InscripcionIndexType) => {
    setInscripcionSeleccionada(inscripcion);
    setOpenDialogCursos(true);
  };

  const handleDelete = (inscripcion: InscripcionIndexType) => {
    setInscripcionSeleccionada(inscripcion);
    setOpenDialogEliminar(true);
  };

  const columns = InscripcionColumns({
    onView: () => {
      navigate("/inscripciones");
    },
    onViewCursos: handleViewCursos,
    onDelete: handleDelete,
    canDelete: puedeEliminar,
  });

  const inscripciones = data?.data ?? [];
  const totalPages = data?.meta.totalPages ?? 1;
  const currentPage = data?.meta.page ?? page;
  const totalInscripciones = data?.meta.total ?? 0;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <AppTitle
          title="Inscripciones"
          subtitle="Gestiona las inscripciones de los estudiantes."
        />

        {puedeCrear && (
          <Button
            type="button"
            onClick={() => navigate("/inscripciones/crear")}
          >
            Crear inscripción
          </Button>
        )}
      </div>

      <QueryState
        isLoading={isLoading}
        isError={isError}
        error={error}
      >
        <DataTable
          columns={columns}
          data={inscripciones}
          pageCount={totalPages}
          pageIndex={currentPage - 1}
          totalRows={totalInscripciones}
          onPaginationChange={(newPage) => setPage(newPage + 1)}
        />
      </QueryState>

      <DialogCursos
        open={openDialogCursos}
        onOpenChange={setOpenDialogCursos}
        initialData={inscripcionSeleccionada}
      />

      <DialogEliminarInscripcion
        open={openDialogEliminar}
        onOpenChange={setOpenDialogEliminar}
        inscripcion={inscripcionSeleccionada}
      />
    </div>
  );
};