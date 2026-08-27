import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Mail, User, BookOpen } from "lucide-react";
import { InscripcionIndexType } from "../Schema/InscripcionSchema";

interface DialogVerInscripcionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inscripcion: InscripcionIndexType | null;
}

export function DialogVerInscripcion({
  open,
  onOpenChange,
  inscripcion,
}: DialogVerInscripcionProps) {
  if (!inscripcion) return null;

  const nombreCompleto = `${inscripcion.nombre} ${inscripcion.apellidoPaterno} ${inscripcion.apellidoMaterno}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalle de Inscripción</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{nombreCompleto}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Correo electrónico</p>
              <p className="font-medium">{inscripcion.correo}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={inscripcion.estadoAcceso === "habilitado" ? "default" : inscripcion.estadoAcceso === "pendiente" ? "secondary" : "destructive"}>
              {inscripcion.estadoAcceso}
            </Badge>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="font-medium">Cursos inscritos ({inscripcion.cursos.length})</span>
            </div>
            {inscripcion.cursos.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tiene cursos inscritos</p>
            ) : (
              <ul className="list-disc list-inside text-sm space-y-1">
                {inscripcion.cursos.map((curso) => (
                  <li key={curso.id}>{curso.nombre}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
