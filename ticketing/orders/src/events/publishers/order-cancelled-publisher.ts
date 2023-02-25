import { Publisher, OrderCancelledEvent, Subjects } from '@ticketingtutorial/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
