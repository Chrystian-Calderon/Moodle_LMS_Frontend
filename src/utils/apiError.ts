import axios from "axios";

export interface ApiErrorBody {
    success?: boolean;
    statusCode?: number;
    message: string;
    error?: string;
}

export function getApiErrorCode(error: unknown): string | undefined {
    if (axios.isAxiosError(error)) {
        return (error.response?.data as ApiErrorBody | undefined)?.error;
    }

    return undefined;
}

export function getApiErrorStatus(error: unknown): number | undefined {
    if (axios.isAxiosError(error)) {
        return error.response?.status;
    }

    return undefined;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as ApiErrorBody | undefined;

        if (data?.message) {
            return data.message;
        }

        if (error.code === "ECONNABORTED") {
            return "El servidor tardó demasiado en responder.";
        }

        if (error.code === "ERR_NETWORK") {
            return "No se pudo conectar con el servidor.";
        }
    }

    return fallback;
}