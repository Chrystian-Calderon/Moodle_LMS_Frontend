"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
    FileText,
    Link as LinkIcon,
    ExternalLink,
    Eye,
    EyeOff,
    Image as ImageIcon,
    Video,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { RecursoLeccionType } from "../Schema/LeccionSchema";

// Worker de pdf.js servido desde CDN (evita problemas de bundling con Next.js)
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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


function PdfViewer({ url }: { url: string }) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.1);
    const [error, setError] = useState(false);

    const onDocumentLoadSuccess = useCallback(
        ({ numPages }: { numPages: number }) => {
            setNumPages(numPages);
            setPageNumber(1);
        },
        []
    );

    return (
        <div
            className="overflow-hidden rounded-lg border bg-muted/30 shadow-sm"
            onContextMenu={(e) => e.preventDefault()}
        >
            <div className="flex items-center justify-between gap-2 border-b bg-background/80 px-3 py-2 backdrop-blur">
                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <span className="min-w-[70px] text-center text-xs text-muted-foreground">
                        {numPages ? `${pageNumber} / ${numPages}` : "…"}
                    </span>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled={!numPages || pageNumber >= numPages}
                        onClick={() =>
                            setPageNumber((p) =>
                                numPages ? Math.min(numPages, p + 1) : p
                            )
                        }
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled={scale <= 0.6}
                        onClick={() => setScale((s) => Math.max(0.6, s - 0.15))}
                    >
                        <ZoomOut className="h-4 w-4" />
                    </Button>

                    <span className="w-10 text-center text-xs text-muted-foreground">
                        {Math.round(scale * 100)}%
                    </span>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled={scale >= 2.5}
                        onClick={() => setScale((s) => Math.min(2.5, s + 0.15))}
                    >
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex max-h-[70vh] min-h-[400px] justify-center overflow-auto bg-neutral-100 p-4 dark:bg-neutral-900">
                {error ? (
                    <div className="flex items-center py-16 text-sm text-destructive">
                        No se pudo cargar el PDF.
                    </div>
                ) : (
                    <Document
                        file={url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={() => setError(true)}
                        loading={
                            <div className="flex items-center gap-2 py-16 text-sm text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Cargando documento…
                            </div>
                        }
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            className="!bg-white shadow-md"
                            renderAnnotationLayer={false}
                        />
                    </Document>
                )}
            </div>
        </div>
    );
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

    const esPdf = recurso.tipoRecurso === "pdf" || extension === "pdf";

    const esImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(
        extension
    );

    const esVideo = ["mp4", "webm", "ogg", "mov"].includes(extension);

    if (esPdf) {
        return (
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2 text-sm font-medium">
                        <FileText className="h-4 w-4 shrink-0 text-red-500" />
                        <span className="truncate">{recurso.nombre}</span>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setMostrarViewer((v) => !v)}
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

                {mostrarViewer && <PdfViewer url={href} />}
            </div>
        );
    }

    if (esImagen) {
        return (
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2 text-sm font-medium">
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                        <span className="truncate">{recurso.nombre}</span>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setMostrarViewer((v) => !v)}
                    >
                        {mostrarViewer ? "Ocultar" : "Ver imagen"}
                    </Button>
                </div>

                {mostrarViewer && (
                    <div
                        className="flex max-h-[600px] justify-center overflow-auto rounded-lg border bg-muted/20 p-2"
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <img
                            src={href}
                            alt={recurso.nombre}
                            draggable={false}
                            className="max-h-[580px] max-w-full select-none rounded object-contain"
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
                        <span className="truncate">{recurso.nombre}</span>
                    </div>
                </div>

                <video
                    controls
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                    className="max-h-[600px] w-full rounded-lg border bg-black"
                    src={href}
                >
                    Tu navegador no soporta la reproducción de video.
                </video>
            </div>
        );
    }

    const Icono = recurso.tipoRecurso === "enlace" ? LinkIcon : FileText;

    return (
        <div className="flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm">
            <span className="flex min-w-0 items-center gap-2">
                <Icono className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{recurso.nombre}</span>
            </span>

            <div className="flex shrink-0 gap-1">
                <a href={href} target="_blank" rel="noreferrer">
                    <Button type="button" variant="ghost" size="icon" title="Abrir">
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                </a>
            </div>
        </div>
    );
}