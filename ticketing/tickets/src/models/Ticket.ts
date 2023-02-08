import mongoose from 'mongoose';

interface ITicket {
  title: string;
  price: number;
  userId: string;
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
    },
    userId: {
      type: String,
      required: true,
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
