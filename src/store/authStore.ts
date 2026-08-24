import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginResponseType } from "@/features/Auth/Schema/AuthSchema";

type Usuario = LoginResponseType["usuario"];
type Menu = LoginResponseType["usuario"]["menus"];
type Permisos = LoginResponseType["usuario"]["permisos"];
type Rol = LoginResponseType["usuario"]["rol"];

interface AuthState {
    token: string | null;
    usuario: Usuario | null;
    rol: Rol;
    permisos: Permisos;
    menu: Menu;

    login: (data: LoginResponseType) => void;
    logout: () => void;

    hasPermission: (permission: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            usuario: null,
            rol: [],
            permisos: [],
            menu: [],

            login: (data) => {
                const {
                    access_token,
                    usuario,
                } = data;

                set({
                    token: access_token,
                    usuario,
                    rol: usuario.rol,
                    permisos: usuario.permisos,
                    menu: usuario.menus,
                });
            },

            logout: () => {
                set({
                    token: null,
                    usuario: null,
                    rol: [],
                    permisos: [],
                    menu: [],
                });
            },

            hasPermission: (permission) => {
                return get().permisos.includes(permission);
            },
        }),
        {
            name: "auth-storage",
        }
    )
);