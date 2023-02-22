import mongoose from 'mongoose';
import { OrderStatus } from '@ticketingtutorial/common';
import { Ticket } from './Ticket';

interface IOrder {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: Ticket;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus), // forces the values to be in the enum
      default: OrderStatus.Created, // not super necessary, but nice to have
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
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

const OrderModel = mongoose.model('Order', orderSchema);

class Order extends OrderModel {
  constructor(attr: IOrder) {
    if (attr) {
      super({ ...attr, ticket: attr.ticket._id }); // good spread Palli!
    } else {
      super(); // for some very strange reason when using find() or findOne() the constructor is called with no data so this is the only way to fix it
    }
  }
}

export { Order, OrderStatus };
