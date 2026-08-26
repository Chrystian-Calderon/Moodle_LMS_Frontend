import { ModeToggle } from "@/components/ModeToggle";
import { Reset_password_form } from "@/features/Auth/components/reset_password_form";


export function ChangePassword() {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <div className="absolute top-4 right-4 flex items-center gap-3">
                <ModeToggle />
            </div>

            <div className="w-full max-w-md">
                <Reset_password_form />
            </div>
        </div>
    );
}