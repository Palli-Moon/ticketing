import { Subjects, Publisher, PaymentCreatedEvent } from '@ticketingtutorial/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
