import { LoaderCircle } from "lucide-react";

interface LoadingProps {
    message?: string;
    fullScreen?: boolean;
}

export function Loading({
    message = "Cargando...",
    fullScreen = false,
}: LoadingProps) {
    return (
        <div
            className={[
                "flex items-center justify-center",
                fullScreen ? "min-h-screen" : "min-h-[240px]",
            ].join(" ")}
        >
            <div className="flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
                </div>

                <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                        {message}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Por favor, espera un momento
                    </p>
                </div>
            </div>
        </div>
    );
}
