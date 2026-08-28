import { useMutation, useQuery } from "@tanstack/react-query";
import { descargarCertificado, MisCertificados, verificarCertificado } from "../Service/CerticadoService";

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

export function useVerificarCertificado(codigo: string | undefined) {
    return useQuery({
        queryKey: ["certificados", "verificar", codigo],

        queryFn: () => verificarCertificado(codigo!),

        enabled: Boolean(codigo),

        retry: false,
    });
}