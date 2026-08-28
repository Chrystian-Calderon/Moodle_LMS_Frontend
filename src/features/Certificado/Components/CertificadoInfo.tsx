import {
    CalendarDays,
    GraduationCap,
    Hash,
    User,
} from "lucide-react";

import { InfoField } from "@/components/common/info/InfoField";

interface CertificadoInfoProps {
    certificado: {
        titulo: string;
        numeroCertificado: string;
        fechaEmision: string;
        codigoVerificacion: string;
        usuario: {
            username: string;
        };
        curso?: {
            nombre: string;
        } | null;
        modulo?: {
            nombre: string;
        } | null;
    };
}

export function CertificadoInfo({
    certificado,
}: CertificadoInfoProps) {
    return (
        <div className="p-6 sm:p-8">
            <div className="mb-8 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Certificado
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                    {certificado.titulo}
                </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard
                    icon={<User className="h-5 w-5" />}
                    label="Estudiante"
                    value={certificado.usuario.username}
                />

                <InfoCard
                    icon={<GraduationCap className="h-5 w-5" />}
                    label={certificado.curso ? "Curso" : "Módulo"}
                    value={
                        certificado.curso?.nombre ??
                        certificado.modulo?.nombre ??
                        "-"
                    }
                />

                <InfoCard
                    icon={<CalendarDays className="h-5 w-5" />}
                    label="Fecha de emisión"
                    value={new Date(
                        certificado.fechaEmision
                    ).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })}
                />

                <InfoCard
                    icon={<Hash className="h-5 w-5" />}
                    label="N.º de certificado"
                    value={certificado.numeroCertificado}
                    valueClassName="font-mono text-sm font-semibold"
                />
            </div>

            <div className="mt-6 rounded-xl border border-dashed p-5 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Código de verificación
                </p>

                <p className="mt-2 font-mono text-lg font-bold tracking-widest">
                    {certificado.codigoVerificacion}
                </p>
            </div>
        </div>
    );
}

interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    valueClassName?: string;
}

function InfoCard({
    icon,
    label,
    value,
    valueClassName,
}: InfoCardProps) {
    return (
        <div className="rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center gap-3">
                <div className="text-primary">
                    {icon}
                </div>

                <InfoField
                    label={label}
                    value={value}
                    valueClassName={
                        valueClassName ??
                        "mt-1 text-sm font-semibold text-neutral-900 dark:text-neutral-200"
                    }
                />
            </div>
        </div>
    );
}
