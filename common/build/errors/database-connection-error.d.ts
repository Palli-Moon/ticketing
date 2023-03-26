import { CustomError } from './custom-error';
export declare class DatabaseConnectionError extends CustomError {
    private reason;
    statusCode: number;
    constructor(reason?: string);
    serializeErrors(): {
        message: string;
    }[];
}
