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


export const VerificarCertificadoSchema = z.object({
    valido: z.boolean(),

    certificado: z.object({
        id: z.string(),
        codigoVerificacion: z.string(),
        numeroCertificado: z.string(),
        titulo: z.string(),
        tipo: z.string(),
        estado: z.string(),
        fechaEmision: z.string(),

        usuario: z.object({
            id: z.string(),
            username: z.string(),
        }),

        curso: z
            .object({
                id: z.string(),
                nombre: z.string(),
                slug: z.string(),
            })
            .nullable(),

        modulo: z
            .object({
                id: z.string(),
                nombre: z.string(),
                cursoId: z.string(),
            })
            .nullable(),
    }),
});

export type VerificarCertificado = z.infer<
    typeof VerificarCertificadoSchema
>;

