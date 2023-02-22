import mongoose from 'mongoose';

interface IOrder {
  userId: string;
  status: string;
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
    super(attr);
  }
}

export { Order };
