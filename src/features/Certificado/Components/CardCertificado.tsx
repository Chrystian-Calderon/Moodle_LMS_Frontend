import { Download, Loader2 } from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Certificado } from "../Schema/CertificadoSchema";

import certificado_preview from "@/assets/certificado_preview.png";

interface CertificadoCardProps {
    certificado: Certificado;
    onDownload: (idCertificado: string) => void;
    isDownloading?: boolean;
}

export function CertificadoCard({
    certificado,
    onDownload,
    isDownloading = false,
}: CertificadoCardProps) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="flex gap-4 p-3">
                <div className="h-24 w-32 shrink-0 overflow-hidden rounded-md border bg-muted">
                    <img
                        src={certificado_preview}
                        alt="Vista previa del certificado"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Certificado
                        </p>

                        <h3 className="mt-1 truncate text-sm font-semibold">
                            {certificado.nombre}
                        </h3>
                    </div>

                    <Button
                        size="sm"
                        className="mt-2 w-fit transition-all hover:-translate-y-0.5 hover:shadow-sm"
                        onClick={() =>
                            onDownload(certificado.idCertificado)
                        }
                        disabled={isDownloading}
                    >
                        {isDownloading ? (
                            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Download className="mr-2 h-3.5 w-3.5" />
                        )}

                        {isDownloading
                            ? "Descargando..."
                            : "Descargar"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
