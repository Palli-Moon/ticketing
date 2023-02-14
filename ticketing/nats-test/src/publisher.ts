import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear(); // clears the console. mind blown

// stan = client
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('publisher connected to NATS');

  // Now the data is typechecked!
  new TicketCreatedPublisher(stan).publish({
    id: '123',
    title: 'concert',
    price: 200,
  });
});
