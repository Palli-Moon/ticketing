import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/Order';
import { Ticket } from '../../models/Ticket';

const URI = '/api/orders';
const COOKIE = global.createCookie;

it('returns an error if the ticket does not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId();
  await request(app).post(URI).set('Cookie', COOKIE()).send({ ticketId }).expect(404);
});

it('returns an error if the ticket is reserved', async () => {
  const ticket = new Ticket({
    title: 'concert',
    price: 20,
  });
  await ticket.save();
  const order = new Order({
    ticket,
    userId: 'asdfasdf',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();
  await request(app).post(URI).set('Cookie', COOKIE()).send({ ticketId: ticket.id }).expect(400);
});

it('reserves a ticket', async () => {
  const ticket = new Ticket({
    title: 'concert',
    price: 20,
  });
  await ticket.save();
  await request(app).post(URI).set('Cookie', COOKIE()).send({ ticketId: ticket.id }).expect(201);
});

it.todo('emits an order created event'); // Cool!
