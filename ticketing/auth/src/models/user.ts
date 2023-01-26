import mongoose from 'mongoose';

interface IUser {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('User', userSchema);

// Ensures that the correct attributes are entered
class User extends UserModel {
  constructor(attr: IUser) {
    super(attr);
  }
}

export { User };
