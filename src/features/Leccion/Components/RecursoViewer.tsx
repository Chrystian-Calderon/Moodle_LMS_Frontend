"use client";

import { useState } from "react";
import {
    Download,
    FileText,
    Link as LinkIcon,
    ExternalLink,
    Eye,
    EyeOff,
    Image as ImageIcon,
    Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { RecursoLeccionType } from "../Schema/LeccionSchema";

interface RecursoViewerProps {
    recurso: RecursoLeccionType;
}

function getExtension(url: string) {
    try {
        const pathname = new URL(url).pathname;
        return pathname.split(".").pop()?.toLowerCase() ?? "";
    } catch {
        return "";
    }
}

export function RecursoViewer({ recurso }: RecursoViewerProps) {
    const [mostrarViewer, setMostrarViewer] = useState(false);

    const href = recurso.urlExterna ?? recurso.rutaRecurso ?? "";

    if (!href) {
        return (
            <div className="rounded-md border p-3 text-sm text-muted-foreground">
                Este recurso no tiene un archivo o enlace disponible.
            </div>
        );
    }

    const extension = getExtension(href);

    const esPdf =
        recurso.tipoRecurso === "pdf" ||
        extension === "pdf";

    const esImagen = [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "gif",
        "svg",
    ].includes(extension);

    const esVideo = [
        "mp4",
        "webm",
        "ogg",
        "mov",
    ].includes(extension);

    if (esPdf) {
        return (
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2 text-sm font-medium">
                        <FileText className="h-4 w-4 shrink-0 text-red-500" />

                        <span className="truncate">
                            {recurso.nombre}
                        </span>
                    </div>

                    <div className="flex shrink-0 gap-1">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setMostrarViewer((v) => !v)
                            }
                        >
                            {mostrarViewer ? (
                                <>
                                    <EyeOff className="mr-2 h-4 w-4" />
                                    Ocultar
                                </>
                            ) : (
                                <>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Ver PDF
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {mostrarViewer && (
                    <div className="overflow-hidden rounded-lg border bg-muted/20">
                        <iframe
                            src={href}
                            title={recurso.nombre}
                            className="h-[70vh] min-h-[500px] w-full"
                        />
                    </div>
                )}
            </div>
        );
    }

    if (esImagen) {
        return (
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2 text-sm font-medium">
                        <ImageIcon className="h-4 w-4 text-blue-500" />

                        <span className="truncate">
                            {recurso.nombre}
                        </span>
                    </div>

                    <div className="flex shrink-0 gap-1">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setMostrarViewer((v) => !v)
                            }
                        >
                            {mostrarViewer ? "Ocultar" : "Ver imagen"}
                        </Button>

                        <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            download
                        >
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                title="Descargar"
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                        </a>
                    </div>
                </div>

                {mostrarViewer && (
                    <div className="flex max-h-[600px] justify-center overflow-auto rounded-lg border bg-muted/20 p-2">
                        <img
                            src={href}
                            alt={recurso.nombre}
                            className="max-h-[580px] max-w-full rounded object-contain"
                        />
                    </div>
                )}
            </div>
        );
    }

    if (esVideo) {
        return (
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2 text-sm font-medium">
                        <Video className="h-4 w-4 text-purple-500" />

                        <span className="truncate">
                            {recurso.nombre}
                        </span>
                    </div>

                    <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        download
                    >
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            title="Descargar"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    </a>
                </div>

                <video
                    controls
                    className="max-h-[600px] w-full rounded-lg border bg-black"
                    src={href}
                >
                    Tu navegador no soporta la reproducción de video.
                </video>
            </div>
        );
    }

    const Icono =
        recurso.tipoRecurso === "enlace"
            ? LinkIcon
            : FileText;

    return (
        <div className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm">
            <span className="flex min-w-0 items-center gap-2">
                <Icono className="h-4 w-4 shrink-0 text-muted-foreground" />

                <span className="truncate">
                    {recurso.nombre}
                </span>
            </span>

            <div className="flex shrink-0 gap-1">
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        title="Abrir"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                </a>
            </div>
        </div>
    );
}   