import { Publisher, Subjects, TicketUpdatedEvent } from '@ticketingtutorial/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
