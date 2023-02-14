import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

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

  const options = stan
    .subscriptionOptions()
    .setDeliverAllAvailable() // Redelivers every available message when the listener comes back up
    .setDurableName('listenername') // With this and setDeliverAllAvailable only messages that have not been acknowledged will be redelivered. Should be used with queuegroup
    .setManualAckMode(true); // Manual ackmode means the message needs to be acknowledged or the service will keep trying to send it
  const subscription = stan.subscribe('ticket:created', 'listenerQueueGroup', options);
  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack(); // Acknowledge the message
  });
});

// Listen for SIGINT and SIGTERM signals (ctrl+c or close) won't work when forcibly closed
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000; // 5 sec

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client.subscriptionOptions().setDeliverAllAvailable().setManualAckMode(true).setAckWait(this.ackWait).setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const data = this.parseMessage(msg);
      this.onMessage(data, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
  }
}
