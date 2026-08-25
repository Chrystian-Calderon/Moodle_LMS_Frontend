import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { InscripcionIndexType } from "../Schema/InscripcionSchema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";

interface InscripcionColumnsProps {
  onDelete: (inscripcion: InscripcionIndexType) => void;
  onView: (id: string) => void;
  onViewCursos: (inscripcion: InscripcionIndexType) => void;
  canDelete: boolean;
}

export function InscripcionColumns({
  onDelete,
  onView,
  onViewCursos,
  canDelete,
}: InscripcionColumnsProps): ColumnDef<InscripcionIndexType>[] {
  return [
    {
      id: "id",
      header: "Estudiante",
      cell: ({ row }) => {
        const inscripcion = row.original;
        console.log("inscripcion", inscripcion);
        const nombreCompleto = `${inscripcion.nombre} ${inscripcion.apellidoPaterno} ${inscripcion.apellidoMaterno}`;
        return (
          <div>
            {nombreCompleto}
          </div>
        );
      }
    },

    {
      accessorKey: "correo",
      header: "Correo",
    },

    {
      id: "cursos",
      header: "Cursos inscritos",
      cell: ({ row }) => {
        const inscripcion = row.original;
        const cantidadCursos = inscripcion.cursos.length;
        return (
          <div className="flex items-center gap-2">
            {cantidadCursos} {cantidadCursos === 1 ? "curso" : "cursos"}
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer"
              onClick={() => onViewCursos(row.original)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },

    // {
    //   accessorKey: "estadoAcceso",
    //   header: "Estado de acceso",
    //   cell: ({ row }) => {
    //     const estado = row.original.estadoAcceso.toLowerCase();

    //     return (
    //       <Badge
    //         variant={
    //           estado === "habilitado"
    //             ? "default"
    //             : estado === "pendiente"
    //               ? "secondary"
    //               : "destructive"
    //         }
    //       >
    //         {row.original.estadoAcceso}
    //       </Badge>
    //     );
    //   },
    // },

    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(row.original.id)}>
              Ver
            </DropdownMenuItem>
            {canDelete && (
              <DropdownMenuItem onClick={() => onDelete(row.original)}>
                Eliminar
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  ];
}
