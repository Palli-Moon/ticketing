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
    await ticket2!.save(); // expect(() => {}).toThrow() is not working correctly here
  } catch (err) {
    return;
  }

  throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123',
  });

  for (let i = 0; i < 5; i++) {
    await ticket.save();
    expect(ticket.version).toEqual(i);
  }
});
