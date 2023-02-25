import express, { Request, Response } from 'express';
import { Order, OrderStatus } from '../models/Order';
import { Ticket } from '../models/Ticket';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ticketingtutorial/common';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

// We don't actually want to delete the order completely, but rather cancel it
router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  const ticket = await Ticket.findById(order?.ticket); // Should be enough to populate, but the wrapper is being a bitch

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  order.status = OrderStatus.Cancelled;
  await order.save();

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    ticket: {
      id: ticket?.id,
    },
  });

  res.status(204).send(order);
});

export { router as deleteOrdersRouter };
