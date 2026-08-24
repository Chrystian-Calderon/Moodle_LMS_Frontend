import { ModeToggle } from "@/components/ModeToggle";
import { AppTitle } from "@/components/common/Apptittle";
import { LoginForm } from "@/features/Auth/Components/loginform";

export const AuthPage = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <div className="absolute top-4 right-4 flex items-center gap-3">
                <div className="text-right">
                    <AppTitle
                        title="ELITE ACADEMY"
                        subtitle="Learning Management System"
                    />
                </div>
                <ModeToggle />
            </div>
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
};