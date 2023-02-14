import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('listener connected to NATS');

  stan.on('close', () => {
    console.log('listener NATS connection closed');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

// Listen for SIGINT and SIGTERM signals (ctrl+c or close) won't work when forcibly closed
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
