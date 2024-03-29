import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';
import { Order, OrderStatus } from '../../models/Order';
import { natsWrapper } from '../../nats-wrapper';

const URI = '/api/orders';
const COOKIE = global.createCookie;

it('marks an order as cancelled', async () => {
  const user = COOKIE();
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const { body: order } = await request(app).post(URI).set('Cookie', user).send({ ticketId: ticket.id }).expect(201);
  await request(app).delete(`${URI}/${order.id}`).set('Cookie', user).send().expect(204);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits an order cancelled event', async () => {
  const user = COOKIE();
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const { body: order } = await request(app).post(URI).set('Cookie', user).send({ ticketId: ticket.id }).expect(201);
  await request(app).delete(`${URI}/${order.id}`).set('Cookie', user).send().expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
