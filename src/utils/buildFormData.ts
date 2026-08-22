export function buildFormData(
    data: Record<string, unknown>,
): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            return;
        }

        if (value instanceof File) {
            formData.append(key, value);
            return;
        }

        if (Array.isArray(value)) {
            value.forEach((item) => {
                formData.append(key, String(item));
            });

            return;
        }

        formData.append(key, String(value));
    });

    return formData;
}