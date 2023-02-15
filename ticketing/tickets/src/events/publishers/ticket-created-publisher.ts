import { Publisher, Subjects, TicketCreatedEvent } from '@ticketingtutorial/common';

export class TicketCreadetPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
