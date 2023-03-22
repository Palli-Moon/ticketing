import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/Ticket';
import { Order, OrderStatus } from '../models/Order';
import { natsWrapper } from '../nats-wrapper';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { requireAuth, validateRequest, BadRequestError, NotFoundError } from '@ticketingtutorial/common';

const router = express.Router();
const EXPIRATION_WINDOW_SECONDS = 1 * 60; // may want to be an env or other way where you can adjust this before deploying
//asdf
router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      // Note: it may be a dangerous assumption to make that this is a mongo id. If the ticket service changes databases or some strategy, we are
      //       hard coupling another service to this assumption. This is done here to demonstrate how to validate a mongo id.
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) // Check if valid mongo id
      .withMessage('TicketId must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (await ticket.isReserved()) {
      throw new BadRequestError('Ticket is already reserved');
    }

    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt,
      ticket,
    });

    await order.save();

    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt!.toISOString(),
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    res.status(201).send(order);
  }
);

export { router as createOrdersRouter };
