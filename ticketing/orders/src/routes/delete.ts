import express, { Request, Response } from 'express';
import { Order, OrderStatus } from '../models/Order';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@ticketingtutorial/common';

const router = express.Router();

// We don't actually want to delete the order completely, but rather cancel it
router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  order.status = OrderStatus.Cancelled;
  await order.save();

  res.status(204).send(order);
});

export { router as deleteOrdersRouter };
