// src/utils/ApiError.ts
export class ApiError extends Error {
    statusCode: number;
    success: boolean;
    errors: string[];

    constructor(statusCode: number, message: string, errors: string[] = []) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;

        // This is needed because we're extending a built-in class
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
