import { useMutation, useQuery } from "@tanstack/react-query";
import { descargarCertificado, MisCertificados } from "../Service/CerticadoService";

export function useMisCertificados() {
    return useQuery({
        queryKey: ["certificados", "mis-certificados"],
        queryFn: MisCertificados,
    });
}

export function useDescargarCertificado() {
    return useMutation({
        mutationFn: descargarCertificado,
        onSuccess: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "certificado.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        },
    });
}