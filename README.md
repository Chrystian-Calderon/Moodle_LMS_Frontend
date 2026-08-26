# Elite Academy - LMS Frontend

Plataforma de aprendizaje en linea (Learning Management System) construida con React y TypeScript. Sistema de gestion de cursos, modulos, lecciones, inscripciones y progreso de estudiantes.

---

## Tabla de contenido

- [Caracteristicas](#caracteristicas)
- [Stack tecnologico](#stack-tecnologico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalacion](#instalacion)
- [Scripts disponibles](#scripts-disponibles)
- [Variables de entorno](#variables-de-entorno)
- [Arquitectura](#arquitectura)
  - [Modulo por feature](#modulo-por-feature)
  - [Flujo de datos](#flujo-de-datos)
- [Autenticacion y permisos](#autenticacion-y-permisos)
- [Rutas](#rutas)
- [Componentes reutilizables](#componentes-reutilizables)

---

## Caracteristicas

- Gestion de usuarios con roles y permisos
- Creacion y edicion de cursos con imagenes de portada
- Organizacion de cursos en modulos y lecciones
- Editor de contenido rico (TipTap) para lecciones
- Sistema de formularios y preguntas para lecciones
- Inscripcion de estudiantes a cursos y modulos
- Seguimiento de progreso de aprendizaje
- Video embebido con deteccion automatica de proveedor
- Recursos descargables y enlaces externos por leccion
- Tema claro/oscuro con deteccion de preferencia del sistema
- Interfaz completamente en espanol

---

## Stack tecnologico

| Capa | Tecnologia |
|------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite (rolldown-vite) |
| Estilos | Tailwind CSS v4 |
| Componentes UI | shadcn/ui (New York) + Radix UI |
| Icons | Lucide React + FontAwesome |
| State global | Zustand (persistido en localStorage) |
| Server state | TanStack React Query v5 |
| Data tables | TanStack React Table v8 |
| Formularios | React Hook Form + Zod |
| Editor rich text | TipTap v3 |
| HTTP client | Axios |
| Routing | React Router DOM v7 |
| Toasts | Sonner |
| Sanitizacion | DOMPurify |
| Package manager | pnpm |

---

## Estructura del proyecto

```
src/
├── api/                    # Instancia Axios con interceptores de auth
├── assets/                 # Assets estaticos
├── components/
│   ├── ui/                 # 19 componentes shadcn/ui
│   ├── common/             # Componentes compartidos (FormField, QueryState, etc.)
│   ├── data-table/         # DataTable con paginacion server-side
│   ├── dashboard/          # Sidebar de navegacion
│   ├── nav/                # Headerbar
│   └── Login/              # ProtectedRoute, ButtonLogOut
├── features/               # Modulos por dominio
│   ├── Auth/               # Login, logout, cambio de contrasena
│   ├── Usuario/            # CRUD de usuarios, perfil
│   ├── Curso/              # CRUD de cursos, categorias
│   ├── Modulo/             # CRUD de modulos
│   ├── Leccion/            # CRUD de lecciones, recursos, progreso
│   ├── FormularioLeccion/  # Formularios y preguntas
│   ├── Inscripciones/      # Gestion de inscripciones
│   ├── Progreso/           # Seguimiento de progreso
│   ├── Roles/              # Listado de roles
│   └── Welcome/            # Dashboard de inicio
├── hooks/                  # usePermission, useRoles, use-mobile
├── layouts/                # RootLayout, DashboardLayout
├── lib/                    # Utils (cn), menus laterales
├── pages/                  # Paginas (targets de rutas)
├── routes/                 # Definicion de rutas
├── store/                  # Zustand store (authStore)
└── utils/                  # Constantes, helpers, schemas de respuesta
```

Cada modulo en `features/` sigue esta estructura interna:

```
features/<Nombre>/
├── Schema/       # Schemas Zod + tipos TypeScript
├── Service/      # Funciones de llamada a la API
├── Hook/         # Hooks de React Query (useQuery/useMutation)
├── Components/   # Componentes UI del modulo
└── utils/        # Helpers especificos (opcional)
```

---

## Instalacion

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd Moodle_LMS_Frontend

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env .env.local
# Editar VITE_API_URL apuntando al backend

# Iniciar servidor de desarrollo
pnpm dev
```

---

## Scripts disponibles

| Comando | Descripcion |
|---------|-------------|
| `pnpm dev` | Iniciar servidor de desarrollo con HMR |
| `pnpm build` | Verificacion de tipos + build de produccion |
| `pnpm lint` | Ejecutar ESLint en todo el proyecto |
| `pnpm preview` | Previsualizar build de produccion |

---

## Variables de entorno

| Variable | Descripcion | Default |
|----------|-------------|---------|
| `VITE_API_URL` | URL base del backend API | `http://localhost:3001/api` |

---

## Arquitectura

### Modulo por feature

El proyecto esta organizado por dominios de negocio. Cada feature encapsula su schema, servicio, hooks y componentes.

### Flujo de datos

```
Componente -> Hook (React Query) -> Service (Axios) -> Backend API
     ^                                                       |
     |           Cache invalidation + Toasts                 |
     +-------------------------------------------------------+
```

1. **Service**: Funciones puras que llaman a la API y retornan datos tipados
2. **Hook**: Envuelve el service con `useQuery` (lecturas) o `useMutation` (escrituras), maneja cache y notificaciones
3. **Componente**: Usa el hook y renderiza la UI con `QueryState` para loading/error

---

## Autenticacion y permisos

### Flujo de login

1. El usuario envia credenciales (`correo` + `password`)
2. El backend retorna `access_token` y datos del usuario (roles, permisos, menu)
3. El token se almacena en Zustand (persistido en localStorage)
4. Si el estado del usuario es `"pendiente"`, se redirige a `/cambiar-password`

### Permisos

Los permisos se definen en `src/utils/constants.ts` y se verifican con el hook `usePermission()`:

```tsx
const { can } = usePermission();

// Verificar un permiso
if (can(PERMISSIONS.USUARIOS.CREAR)) {
  // Mostrar boton de crear
}

// Verificar multiples permisos
canAny([PERMISSIONS.CURSOS.VER, PERMISSIONS.CURSOS.CREAR]);
canAll([PERMISSIONS.USUARIOS.VER, PERMISSIONS.USUARIOS.EDITAR]);
```

Permisos disponibles: `usuarios`, `cursos`, `formularios`, `inscripciones`, `roles`, `permisos` (cada uno con `ver`, `crear`, `editar`, `eliminar`).

### Tokens

- El interceptor de Axios agrega `Authorization: Bearer <token>` a cada peticion
- En respuesta 401, se ejecuta `logout()` automaticamente y se redirige a `/login`

---

## Rutas

| Ruta | Pagina | Requiere auth |
|------|--------|:------------:|
| `/login` | Formulario de login | No |
| `/cambiar-password` | Cambio de contrasena obligatorio | Si |
| `/inicio` | Dashboard de inicio | Si |
| `/perfil` | Mi perfil | Si |
| `/usuario` | Lista de usuarios (DataTable) | Si |
| `/usuario/:id` | Detalle de usuario | Si |
| `/cursos` | Catalogo de cursos | Si |
| `/mis-cursos` | Mis cursos inscritos | Si |
| `/cursos/:id` | Detalle de curso | Si |
| `/cursos/:id/modulos` | Modulos de un curso | Si |
| `/cursos/:id/modulos/:moduloId` | Detalle de modulo | Si |
| `/cursos/:id/modulos/:moduleId/lecciones/:leccionId` | Detalle de leccion | Si |
| `/inscripciones` | Lista de inscripciones | Si |
| `/inscripciones/crear` | Crear inscripcion | Si |

---

## Componentes reutilizables

| Componente | Ubicacion | Descripcion |
|------------|-----------|-------------|
| `DataTable` | `components/data-table/` | Tabla con sorting, filtros, paginacion server-side y visibilidad de columnas |
| `FormField` | `components/common/form/` | Campo de formulario (text, number, textarea, select, checkbox, richtext) |
| `EntityDialog` | `components/common/form/` | Dialogo generico para crear/editar entidades |
| `ImageUpload` | `components/common/form/` | Subida de imagenes con preview (max 5MB, JPG/PNG/WEBP) |
| `QueryState` | `components/common/` | Wrapper para estados de carga, error 403/404 |
| `RichTextEditor` | `components/common/` | Editor de texto rico con TipTap |
| `Banner` | `components/common/` | Hero banner con llamado a la accion |
| `AppTitle` | `components/common/` | Titulo de pagina reutilizable |
| `ProtectedRoute` | `components/Login/` | Ruta protegida con verificacion de token y roles |
| `AppSidebar` | `components/dashboard/` | Sidebar con navegacion filtrada por rol |
