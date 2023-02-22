/*
  Warning: We do **NOT** want to have our Tickets model in the common library. That would lock down the definition between the
           two services and they may not need to have the exact same definition of what a ticket is. The order service does not
           need all the information about a ticket that the ticket service stores, and so on.
*/
import mongoose from 'mongoose';

interface ITicket {
  title: string;
  price: number;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const TicketModel = mongoose.model('Ticket', ticketSchema);

class Ticket extends TicketModel {
  constructor(attr: ITicket) {
    super(attr);
  }
}

export { Ticket };
