import { Subjects } from './base/subjects';
export interface OrderCancelledEvent {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        };
    };
}
