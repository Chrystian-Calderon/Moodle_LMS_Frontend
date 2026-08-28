import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGetNotificaciones, useContarNoLeidas, useMarcarComoLeida } from "@/features/Notificacion/Hook/NotificacionHook";
import { cn } from "@/lib/utils";

export const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { data: notificaciones, isLoading } = useGetNotificaciones();
  const { data: noLeidas = 0 } = useContarNoLeidas();
  const marcarComoLeida = useMarcarComoLeida();

  const handleMarcarLeida = (id: string) => {
    marcarComoLeida.mutate(id);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-xl hover:bg-muted/70"
        >
          <Bell className="h-4 w-4 text-muted-foreground" />
          {noLeidas > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px]"
            >
              {noLeidas > 99 ? "99+" : noLeidas}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-80 rounded-xl p-0"
      >
        <DropdownMenuLabel className="border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Notificaciones</span>
            {noLeidas > 0 && (
              <Badge variant="secondary" className="text-xs">
                {noLeidas} nuevas
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
              Cargando...
            </div>
          ) : !notificaciones || notificaciones.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Bell className="mb-2 h-8 w-8 opacity-50" />
              <p className="text-sm">No tienes notificaciones</p>
            </div>
          ) : (
            notificaciones.map((notificacion) => (
              <DropdownMenuItem
                key={notificacion.id}
                className={cn(
                  "flex flex-col items-start gap-1 px-4 py-3 cursor-pointer",
                  !notificacion.leida && "bg-muted/50"
                )}
                onClick={() => handleMarcarLeida(notificacion.id)}
              >
                <div className="flex w-full items-start justify-between gap-2">
                  <span className="text-sm font-medium leading-tight">
                    {notificacion.titulo}
                  </span>
                  {!notificacion.leida && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {notificacion.mensaje}
                </p>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(notificacion.fechaCreacion).toLocaleDateString("es-PE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>

        {notificaciones && notificaciones.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-2">
              <DropdownMenuItem className="justify-center text-xs text-muted-foreground cursor-pointer">
                Ver todas las notificaciones
              </DropdownMenuItem>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
