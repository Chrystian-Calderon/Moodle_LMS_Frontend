import { Certificado } from "../Schema/CertificadoSchema";
import { CertificadoCard } from "./CardCertificado";

interface CertificadoListProps {
    certificados: Certificado[];
    onDownload: (idCertificado: string) => void;
    downloadingId?: string;
}

export function CertificadoList({
    certificados,
    onDownload,
    downloadingId,
}: CertificadoListProps) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certificados.map((certificado) => (
                <CertificadoCard
                    key={certificado.idCertificado}
                    certificado={certificado}
                    onDownload={onDownload}
                    isDownloading={
                        downloadingId === certificado.idCertificado
                    }
                />
            ))}
        </div>
    );
}
