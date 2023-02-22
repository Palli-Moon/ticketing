import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, BadRequestError, NotFoundError, OrderStatus } from '@ticketingtutorial/common';
import { body } from 'express-validator';
import { Ticket } from '../models/Ticket';
import { Order } from '../models/Order';

const router = express.Router();
const EXPIRATION_WINDOW_SECONDS = 15 * 60; // may want to be an env or other way where you can adjust this before deploying

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
    const ticket = (await Ticket.findById(ticketId)) as Ticket; // is this allowed?

    if (!ticket) {
      throw new NotFoundError();
    }

    if (await ticket.isReserved()) {
      throw new BadRequestError('Ticket is already reserved');
    }

    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    const order = new Order({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt,
      ticket,
    });

    await order.save();

    // Publish event here

    res.status(201).send(order);
  }
);

export { router as createOrdersRouter };