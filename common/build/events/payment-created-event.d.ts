import { Subjects } from './base/subjects';
export interface PaymentCreatedEvent {
    subject: Subjects.PaymentCreated;
    data: {
        id: string;
        orderId: string;
        stripeId: string;
    };
}
