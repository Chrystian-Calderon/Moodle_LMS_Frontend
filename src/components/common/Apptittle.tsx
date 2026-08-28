import { ReactNode } from "react";

interface AppTitleProps {
    title: string;
    subtitle?: string;
    badge?: ReactNode;
}

export function AppTitle({ title, subtitle, badge }: AppTitleProps) {
    return (
        <div>
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-wide text-primary">
                    {title}
                </h1>

                {badge}
            </div>

            {subtitle && (
                <p className="text-sm text-muted-foreground">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
