import { Subjects } from './base/subjects';
export interface ExpirationCompleteEvent {
    subject: Subjects.ExpirationComplete;
    data: {
        orderId: string;
    };
}
