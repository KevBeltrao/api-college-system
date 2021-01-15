import { Schema, model, Document } from 'mongoose';
import { hash } from 'bcryptjs';

interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  active: boolean;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  active: {
    required: true,
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

UserSchema.pre<IUserSchema>('save', async function createHash(next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }

  if (this.password) {
    this.password = await hash(this.password, 10);
  }

  return next();
});

export default model<IUserSchema>('User', UserSchema);
