import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import { InscripcionIndexType } from "../Schema/InscripcionSchema";
import { useEliminarInscripcionesPorEstudiante } from "../Hook/InscripcionHook";

interface DialogEliminarInscripcionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inscripcion: InscripcionIndexType | null;
}

export function DialogEliminarInscripcion({
  open,
  onOpenChange,
  inscripcion,
}: DialogEliminarInscripcionProps) {
  const eliminarMutation = useEliminarInscripcionesPorEstudiante();

  const handleEliminar = () => {
    if (!inscripcion) return;

    eliminarMutation.mutate(inscripcion.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  if (!inscripcion) return null;

  const cantidadCursos = inscripcion.cursos.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Eliminar inscripción
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar todas las inscripciones de{" "}
            <span className="font-semibold text-foreground">
              {inscripcion.nombre} {inscripcion.apellidoPaterno} {inscripcion.apellidoMaterno}
            </span>
            ? Se eliminarán {cantidadCursos} {cantidadCursos === 1 ? "curso" : "cursos"} y todos sus módulos.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={eliminarMutation.isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleEliminar}
            disabled={eliminarMutation.isPending}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {eliminarMutation.isPending ? "Eliminando..." : "Eliminar todo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
