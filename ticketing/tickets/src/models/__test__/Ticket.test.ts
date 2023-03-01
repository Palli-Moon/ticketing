import { Ticket } from '../Ticket';

it('implements optimistic concurrency control', async () => {
  const ticket = Ticket.build({
    title: 'conbcert',
    price: 5,
    userId: '123',
  });

  await ticket.save();

  // Two instances of the same ticket
  const ticket1 = await Ticket.findById(ticket.id);
  const ticket2 = await Ticket.findById(ticket.id);

  ticket1!.set({ price: 10 });
  ticket2!.set({ price: 15 });

  await ticket1!.save();
  try {
    await ticket2!.save();
  } catch (err) {
    return;
  }

  throw new Error('Should not reach this point');
});
