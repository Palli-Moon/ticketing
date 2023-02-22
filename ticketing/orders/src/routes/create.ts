import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@ticketingtutorial/common';
import { body } from 'express-validator';

const router = express.Router();

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
    res.send({});
  }
);

export { router as createOrdersRouter };
