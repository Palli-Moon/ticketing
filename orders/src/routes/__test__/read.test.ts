import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';

const URI = '/api/orders';
const COOKIE = global.createCookie;

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();
  return ticket;
};

it('fetches orders from a particular user', async () => {
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const user1 = global.createCookie();
  const user2 = global.createCookie();

  await request(app).post(URI).set('Cookie', user1).send({ ticketId: ticket1.id }).expect(201);

  // Destructuring and renaming
  const { body: order1 } = await request(app).post(URI).set('Cookie', user2).send({ ticketId: ticket2.id }).expect(201);
  const { body: order2 } = await request(app).post(URI).set('Cookie', user2).send({ ticketId: ticket3.id }).expect(201);

  // User 2 should have 2 tickets ordered white user 1 has 1.
  const res = await request(app).get(URI).set('Cookie', user2).expect(200);
  expect(res.body.length).toEqual(2);
  expect(res.body[0].id).toEqual(order1.id);
  expect(res.body[0].ticket.id).toEqual(ticket2.id);
  expect(res.body[1].id).toEqual(order2.id);
  expect(res.body[1].ticket.id).toEqual(ticket3.id);
});

it('fetches the order', async () => {
  const user = COOKIE();
  const ticket = await buildTicket();
  const { body: order } = await request(app).post(URI).set('Cookie', user).send({ ticketId: ticket.id }).expect(201);

  const res = await request(app).get(`${URI}/${order.id}`).set('Cookie', user).send().expect(200);
  expect(res.body.id).toEqual(order.id);
});

it('returns an error if a user tries to fetch another users order', async () => {
  const user = COOKIE();
  const ticket = await buildTicket();
  const { body: order } = await request(app).post(URI).set('Cookie', user).send({ ticketId: ticket.id }).expect(201);

  await request(app).get(`${URI}/${order.id}`).set('Cookie', COOKIE()).send().expect(401);
});
