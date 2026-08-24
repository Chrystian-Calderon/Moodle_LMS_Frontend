import {
    faHouse,
    faUsersGear,
    faBook,
    faGraduationCap,
    faIdBadge,
} from "@fortawesome/free-solid-svg-icons";

export const menuItems = [
    {
        title: "Inicio",
        icon: faHouse,
        url: "/inicio",
        roles: ["administrador", "estudiante"],
        permission: "",
    },
    {
        title: "Usuarios",
        icon: faUsersGear,
        url: "/usuario",
        roles: ["administrador"],
        permission: "usuarios.ver",
    },
    {
        title: "Cursos",
        icon: faBook,
        url: "/cursos",
        roles: ["administrador", "estudiante"],
        permission: "cursos.ver",
    },
    {
        title: "Mis cursos",
        icon: faGraduationCap,
        url: "/mis-cursos",
        roles: ["estudiante"],
        permission: "cursos.ver",
    },
    {
        title: "Inscripciones",
        icon: faIdBadge,
        url: "/inscripciones",
        roles: ["administrador"],
        permission: "inscripciones.ver",
    }
];
