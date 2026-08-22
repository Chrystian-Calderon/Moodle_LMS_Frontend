import { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ProtectedRoute } from "@/components/Login/ProtectedRoute";
import { AuthPage } from "@/pages/Auth/AuthPage";
import { ChangePassword } from "@/pages/Auth/ChangePassword";
import UsuarioPage from "@/pages/Usuario/UsuarioPage";
import UsuarioDetallePage from "@/pages/Usuario/UsuarioDetallePage";
import CursosPage from "@/pages/Curso/CursoPage";
import CursoDetallePage from "@/pages/Curso/CursoDetallePage";
import MisCursosPage from "@/pages/Curso/MisCursosPage";
import ModulosPage from "@/pages/Modulo/ModuloPage";
import ModuloDetallePage from "@/pages/Modulo/ModuloDetallePage";
import LeccionDetallePage from "@/pages/Leccion/LeccionDetallePage";
import { CrearInscripcionPage } from "@/pages/Inscripciones/CrearInscripcionPage";
import { InscripcionesPage } from "@/pages/Inscripciones/InscripcionesPage";
import InicioPage from "@/pages/Welcome/InicioPage";
import { RouteErrorBoundary } from "@/components/common/app/Routeerrorboundary";
import ProfilePage from "@/pages/Profile/ProfilePage";

const Loading = () => <div>Cargando...</div>;

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<Loading />}>
                <RootLayout />
            </Suspense>
        ),
        children: [
            // / -> /login
            {
                index: true,
                element: <Navigate to="/login" replace />,
            },

            {
                path: "login",
                element: <AuthPage />,
            },

            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "cambiar-password",
                        element: <ChangePassword />,
                    },
                    {
                        element: (
                            <Suspense fallback={<Loading />}>
                                <DashboardLayout />
                            </Suspense>
                        ),
                        errorElement: <RouteErrorBoundary />,
                        children: [
                            { path: "inicio", element: <InicioPage /> },
                            { path: "perfil", element: <ProfilePage /> },
                            { path: "usuario", element: <UsuarioPage /> },
                            { path: "usuario/:id", element: <UsuarioDetallePage /> },
                            { path: "cursos", element: <CursosPage /> },
                            { path: "mis-cursos", element: <MisCursosPage /> },
                            { path: "cursos/:id", element: <CursoDetallePage /> },
                            { path: "cursos/:id/modulos", element: <ModulosPage /> },
                            { path: "cursos/:id/modulos/:moduloId", element: <ModuloDetallePage /> },
                            {
                                path: "cursos/:id/modulos/:moduloId/lecciones/:leccionId",
                                element: <LeccionDetallePage />,
                            },
                            { path: "inscripciones", element: <InscripcionesPage /> },
                            { path: "inscripciones/crear", element: <CrearInscripcionPage /> },
                        ],
                    },
                ],
            },
        ],
    },
]);