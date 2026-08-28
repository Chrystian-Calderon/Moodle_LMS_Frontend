import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/common/form/FormField";
import { AuthSchema, AuthSchemaType } from "../Schema/AuthSchema";
import { useLogin } from "../Hook/AuthHook";

export function LoginForm() {
    const loginMutation = useLogin();

    const { control, handleSubmit } = useForm<AuthSchemaType>({
        resolver: zodResolver(AuthSchema),
    });

    const onSubmit = (data: AuthSchemaType) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Iniciar sesión</CardTitle>
                    <CardDescription>Ingresa tus datos para acceder</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-3">
                            <FormField
                                type="email"
                                control={control}
                                name="correo"
                                label="Correo"
                                placeholder="correo@gmail.com" />

                            <FormField
                                type="password"
                                control={control}
                                name="password"
                                label="Contraseña"
                                placeholder="********"
                            />

                            <Field>
                                <Button type="submit" disabled={loginMutation.isPending}>
                                    {loginMutation.isPending ? "Ingresando..." : "Ingresar"}
                                </Button>

                                <FieldDescription className="text-center">
                                    ¿Te olvidaste tu contraseña?{" "}
                                    <a href="#" className="underline">
                                        Escribe a soporte
                                    </a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}