import { useGetFormularioAdmin } from "../Hook/FormularioHook";
import { FormularioEditor } from "./FormularioEditor";
import { FormularioBuilder } from "./FormularioBuilder";
import { QueryState } from "@/components/common/QueryState";

interface FormularioLeccionManagerProps {
    leccionId: string;
}

export function FormularioLeccionManager({
    leccionId,
}: FormularioLeccionManagerProps) {
    const {
        data: formulario,
        isLoading,
        isError,
        error,
    } = useGetFormularioAdmin(leccionId);

    return (
        <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
            minHeight="min-h-[120px]"
        >
            <div className="space-y-3 rounded-lg border bg-muted/10 p-4">
                <div>
                    <p className="text-sm font-medium">
                        Checkpoint de la lección
                    </p>

                    <p className="text-xs text-muted-foreground">
                        Preguntas que el estudiante debe responder bien para
                        poder completar esta lección.
                    </p>
                </div>

                {formulario ? (
                    <FormularioEditor
                        leccionId={leccionId}
                        formulario={formulario}
                    />
                ) : (
                    <FormularioBuilder leccionId={leccionId} />
                )}
            </div>
        </QueryState>
    );
}