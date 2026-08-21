"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
    CambiarMiPasswordSchema,
    CambiarMiPasswordType,
} from "../Schema/UsuarioSchema";

import { useCambiarMiPassword } from "../Hook/UsuarioHook";
import { EntityDialog } from "@/components/common/form/EntityDialog";
import { FormField } from "@/components/common/form/FormField";

interface ChangePasswordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordDialog({
    open,
    onOpenChange,
}: ChangePasswordDialogProps) {
    const cambiarPassword = useCambiarMiPassword();

    const form = useForm<CambiarMiPasswordType>({
        resolver: zodResolver(CambiarMiPasswordSchema),
        defaultValues: {
            passwordActual: "",
            passwordNueva: "",
            confirmarPassword: "",
        },
    });

    const onSubmit = (data: CambiarMiPasswordType) => {
        cambiarPassword.mutate(
            {
                passwordActual: data.passwordActual,
                passwordNueva: data.passwordNueva,
            },
            {
                onSuccess: () => {
                    form.reset();
                    onOpenChange(false);
                },
            }
        );
    };

    return (
        <EntityDialog
            open={open}
            onOpenChange={(value) => {
                if (!value) {
                    form.reset();
                }

                onOpenChange(value);
            }}
            mode="edit"
            titleCreate=""
            titleEdit="Cambiar contraseña"
            descriptionCreate=""
            descriptionEdit="Ingresa tu contraseña actual y establece una nueva contraseña."
            isLoading={false}
            maxWidth="max-w-lg"
        >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <FormField
                    control={form.control}
                    name="passwordActual"
                    label="Contraseña actual"
                    type="password"
                    placeholder="Ingresa tu contraseña actual"
                />

                <FormField
                    control={form.control}
                    name="passwordNueva"
                    label="Nueva contraseña"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                />

                <FormField
                    control={form.control}
                    name="confirmarPassword"
                    label="Confirmar nueva contraseña"
                    type="password"
                    placeholder="Repite tu nueva contraseña"
                />

                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={cambiarPassword.isPending}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        disabled={cambiarPassword.isPending}
                    >
                        {cambiarPassword.isPending
                            ? "Cambiando..."
                            : "Cambiar contraseña"}
                    </Button>
                </div>
            </form>
        </EntityDialog>
    );
}
