import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';
import { Order, OrderStatus } from '../../models/Order';

const URI = '/api/orders';
const COOKIE = global.createCookie;

it('marks an order as cancelled', async () => {
  const user = COOKIE();
  const ticket = new Ticket({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const { body: order } = await request(app).post(URI).set('Cookie', user).send({ ticketId: ticket.id }).expect(201);
  await request(app).delete(`${URI}/${order.id}`).set('Cookie', user).send().expect(204);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo('emits an order cancelled event');
