export enum OrderStatus {
  Created = 'created', // Order created but ticket not reserved
  Cancelled = 'cancelled', // Catch-all: the ticket has already been reserved, order was cancelled by user, order expired.
  AwaitingPayment = 'awaiting:payment', // Order has reserved the ticket
  Complete = 'complete', // Payment successfully completed
}
