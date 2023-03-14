import { Listener, OrderCreatedEvent, Subjects } from '@ticketingtutorial/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/Order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      price: data.ticket.price,
      ...data,
    });
    await order.save();

    msg.ack();
  }
}
