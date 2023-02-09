import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/Ticket';
import { validateRequest, requireAuth, NotAuthorizedError, NotFoundError } from '@ticketingtutorial/common';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [body('title').not().isEmpty().withMessage('Title is required'), body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({ title, price });
    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
