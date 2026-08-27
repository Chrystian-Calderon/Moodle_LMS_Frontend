
import { AppTitle } from "@/components/common/Apptittle";
import { QueryState } from "@/components/common/QueryState";
import { CertificadoEmpty } from "@/features/Certificado/Components/CertificadoEmpty";
import { CertificadoList } from "@/features/Certificado/Components/CertificadoList";
import {
    useDescargarCertificado,
    useMisCertificados,
} from "@/features/Certificado/Hook/CertificadoHook";

const MisCertificados = () => {
    const certificadosQuery = useMisCertificados();

    const {
        mutate: descargar,
        isPending,
        variables: downloadingId,
    } = useDescargarCertificado();

    const certificados = certificadosQuery.data ?? [];

    return (
        <div className="space-y-6 p-6">
            <AppTitle
                title="Mis certificados"
                subtitle="Certificados que has obtenido."
            />

            <QueryState
                isLoading={certificadosQuery.isLoading}
                isError={certificadosQuery.isError}
                error={certificadosQuery.error}
                minHeight="min-h-[400px]"
            >
                {certificados.length === 0 ? (
                    <CertificadoEmpty />
                ) : (
                    <CertificadoList
                        certificados={certificados}
                        onDownload={descargar}
                        downloadingId={
                            isPending
                                ? downloadingId
                                : undefined
                        }
                    />
                )}
            </QueryState>
        </div>
    );
};

export default MisCertificados;
