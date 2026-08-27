import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DialogConfirmarEliminarModuloProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cursoNombre: string;
  moduloNombre: string;
  onConfirm: () => void;
  isPending?: boolean;
}

export function DialogConfirmarEliminarModulo({
  open,
  onOpenChange,
  cursoNombre,
  moduloNombre,
  onConfirm,
  isPending = false,
}: DialogConfirmarEliminarModuloProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Eliminar módulo
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar el módulo{" "}
            <span className="font-semibold text-foreground">{moduloNombre}</span>{" "}
            del curso{" "}
            <span className="font-semibold text-foreground">{cursoNombre}</span>?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
