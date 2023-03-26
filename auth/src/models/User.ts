import mongoose from 'mongoose';
import { Password } from '../utils/password';

interface IUser {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; // remove prop from object
        delete ret.__v;
      },
    },
  }
);

// We don't use an arrow function here, becuase it would change the meaning of 'this'
// In this case, 'this' means the userSchema
// .pre is a mongoose pre-save hook
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await Password.toHash(this.password);
  }
  next();
});

const UserModel = mongoose.model('User', userSchema);

// Ensures that the correct attributes are entered
class User extends UserModel {
  constructor(attr: IUser) {
    super(attr);
  }
}

export { User };
