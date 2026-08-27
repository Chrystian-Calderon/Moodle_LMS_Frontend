import z from "zod";

export const CertificadoSchema = z.object({
    idCertificado: z.string(),
    idInscripcion: z.string(),
    idModulo: z.string(),
    idUsuario: z.string(),
    idCurso: z.string(),
    nombre: z.string(),
    descripcion: z.string(),
    tipo: z.string(),
    estado: z.string(),
    fechaEmision: z.string(),
    numeroCertificado: z.string(),
});

export type Certificado = z.infer<typeof CertificadoSchema>;
