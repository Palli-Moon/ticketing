import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/Order';
import { Ticket } from '../../models/Ticket';

const URI = '/api/orders';

const buildTicket = async () => {
  const ticket = new Ticket({
    title: 'concert',
    price: 20,
  });
  await ticket.save();
  return ticket;
};

it('fetches orders fro a particular user', async () => {
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
