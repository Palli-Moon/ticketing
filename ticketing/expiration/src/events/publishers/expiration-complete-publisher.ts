import { Subjects, Publisher, ExpirationCompleteEvent } from '@ticketingtutorial/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
