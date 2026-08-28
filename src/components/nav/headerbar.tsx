import { useLocation, useNavigate } from "react-router-dom";
import {
    ChevronDown,
    LogOut,
    User,
} from "lucide-react";

import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../ModeToggle";
import { useAuthStore } from "@/store/authStore";

import {
    Avatar,
    AvatarFallback,
} from "../ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { NotificationBell } from "./notification-bell";

export const Headerbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const usuario = useAuthStore((state) => state.usuario);
    const logout = useAuthStore((state) => state.logout);

    const fullName = "Usuario";

    const initials = "U";

    const email = usuario?.correo || "Sin correo";

    const getPageTitle = () => {
        const path = location.pathname;

        if (path.endsWith("/inicio")) return "Inicio";
        if (path.endsWith("/usuarios")) return "Gestión de Usuarios";
        if (path.endsWith("/cursos")) return "Gestión de Cursos";
        if (path.endsWith("/mis-cursos")) return "Mis Cursos";
        if (path.endsWith("/perfil")) return "Mi Perfil";

        return "Dashboard";
    };

    const handleProfile = () => {
        navigate("/perfil");
    };

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header
            className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-header px-4 sm:px-6"
        >
            <div className="flex items-center gap-3">
                <SidebarTrigger
                    className="h-9 w-9 text-muted-foreground transition-colors hover:text-primary"
                />

                <div className="hidden h-5 w-px bg-border sm:block" />

                <div className="hidden sm:block">
                    <h1 className="text-sm font-semibold tracking-tight text-foreground">
                        {getPageTitle()}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <ModeToggle />

                <NotificationBell />

                <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-10 gap-2 rounded-xl px-2 hover:bg-muted/70 focus-visible:ring-1 focus-visible:ring-primary"
                        >
                            <Avatar className="h-8 w-8 border border-primary/20">
                                <AvatarFallback
                                    className="bg-primary/10 text-xs font-bold tracking-wider text-primary"
                                >
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="hidden flex-col items-start md:flex">
                                <span className="max-w-[180px] truncate text-xs font-semibold leading-tight text-foreground">
                                    {fullName}
                                </span>

                                <span className="max-w-[180px] truncate text-[10px] leading-tight text-muted-foreground">
                                    {email}
                                </span>
                            </div>

                            <ChevronDown className="hidden h-4 w-4 text-muted-foreground transition-transform sm:block" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-64 rounded-xl p-2"
                    >
                        <DropdownMenuLabel className="px-3 py-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border border-primary/20">
                                    <AvatarFallback className="bg-primary/10 font-bold text-primary">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold text-foreground">
                                        {fullName}
                                    </p>

                                    <p className="truncate text-xs text-muted-foreground">
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={handleProfile}
                                className="cursor-pointer rounded-lg py-2.5"
                            >
                                <User className="mr-2 h-4 w-4" />

                                <span>Ver mi perfil</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="cursor-pointer rounded-lg py-2.5 text-red-500 focus:bg-red-500/10 focus:text-red-500"
                        >
                            <LogOut className="mr-2 h-4 w-4" />

                            <span>Cerrar sesión</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};
