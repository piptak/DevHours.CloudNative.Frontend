type ApiError = {
    data: {
        message: string;
    }
}

export function isApiError(object: unknown): object is ApiError {
    const apiError = (object as ApiError);
    return apiError?.data !== undefined && apiError?.data?.message !== undefined;
}

export default ApiError;