import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema, ResetPasswordSchemaType } from "../Schema/AuthSchema";
import { useChangePassword } from "../Hook/AuthHook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { AppTitle } from "@/components/common/Apptittle";
import { FormField } from "@/components/common/form/FormField";

export function ResetFormPass() {
    const changePasswordMutation = useChangePassword();

    const { control, handleSubmit } = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(ResetPasswordSchema),
    });

    const onSubmit = (data: ResetPasswordSchemaType) => {
        changePasswordMutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <AppTitle title="Cambia tu contraseña" subtitle="Por favor, recuerda no olvidarte tu contraseña" />
                </CardHeader>

                <CardContent>
                    <FieldGroup className="gap-3">
                        <FormField
                            type="password"
                            control={control}
                            name="new_password"
                            label="Nueva contraseña"
                            placeholder="**********"
                        />

                        <FormField
                            type="password"
                            control={control}
                            name="confirm_password"
                            label="Confirmar contraseña"
                            placeholder="********"
                        />

                        <Field>
                            <Button type="submit" disabled={changePasswordMutation.isPending}>
                                {changePasswordMutation.isPending ? "Cambiando..." : "Cambiar contraseña"}
                            </Button>
                        </Field>
                    </FieldGroup>
                </CardContent>
            </Card>
        </form>
    );
}