import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Layers } from "lucide-react";
import { InscripcionIndexType } from "../Schema/InscripcionSchema";

interface DialogCursosProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: InscripcionIndexType | null;
}

export function DialogCursos({
  open,
  onOpenChange,
  initialData,
}: DialogCursosProps) {
  const cursos = initialData?.cursos ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Cursos inscritos</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {cursos.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              No hay cursos inscritos
            </p>
          ) : (
            cursos.map((curso) => (
              <Card key={curso.id}>
                <CardHeader className="pb-1">
                  <CardTitle className="flex justify-between items-center">
                    <div className="text-base flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      {curso.nombre}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {curso.categoria.nombre ?? ""}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Layers className="h-3 w-3" />
                      Módulos ({curso.modulos.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {curso.modulos
                        .sort((a, b) => a.orden - b.orden)
                        .map((modulo) => (
                          <Badge key={modulo.id} variant="secondary">
                            {modulo.nombre}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
