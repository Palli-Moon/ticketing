/*
  Warning: We do **NOT** want to have our Tickets model in the common library. That would lock down the definition between the
           two services and they may not need to have the exact same definition of what a ticket is. The order service does not
           need all the information about a ticket that the ticket service stores, and so on.
*/
import mongoose from 'mongoose';
import { Order, OrderStatus } from './Order';

interface TicketAttrs {
  id?: string;
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
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

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    ...attrs,
    _id: attrs.id ?? new mongoose.Types.ObjectId(),
  });
};

ticketSchema.methods.isReserved = async function () {
  // CAN NOT BE ARROW FUNCTION
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [OrderStatus.Created, OrderStatus.AwaitingPayment, OrderStatus.Complete],
    },
  });

  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
