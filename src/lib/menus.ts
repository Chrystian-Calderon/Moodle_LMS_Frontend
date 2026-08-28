import { PERMISSIONS } from "@/utils/constants";
import {
    faHouse,
    faUsersGear,
    faBook,
    faGraduationCap,
    faIdBadge,
    faCertificate,
} from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
    {
        title: "Inicio",
        icon: faHouse,
        url: "/inicio",
    },
    {
        title: "Usuarios",
        icon: faUsersGear,
        url: "/usuario",
        permission: PERMISSIONS.USUARIOS.VER,
    },
    {
        title: "Cursos",
        icon: faBook,
        url: "/cursos",
        permission: PERMISSIONS.CURSOS.VER,
    },
    {
        title: "Mis cursos",
        icon: faGraduationCap,
        url: "/cursos/mis-cursos",
        permission: PERMISSIONS.CURSOS.VER,
    },
    {
        title: "Inscripciones",
        icon: faIdBadge,
        url: "/inscripciones",
        permission: PERMISSIONS.INSCRIPCIONES.VER,
    },
    {
        title: "Mis certificados",
        icon: faCertificate,
        url: "/mis-certificados",
    },
];
