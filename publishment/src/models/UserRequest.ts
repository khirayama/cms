import mongoose from 'mongoose';

import { RoleDocument } from './Role';

export type UserRequestDocument = mongoose.Document & {
  token: string;
  role: mongoose.Types.ObjectId | RoleDocument;
  expiredAt: Date;

  isValid: isValidFunction;
};

type isValidFunction = (this: UserRequestDocument) => boolean;

function getOneDayLater() {
  const now = new Date();
  now.setDate(now.getDate() + 1);

  return now;
}

const userRequestSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      // unique: true,
      default: 'Generated token',
    },
    role: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Role',
    },
    expiredAt: {
      type: Date,
      default: getOneDayLater(),
    },
  },
  {
    timestamps: true,
  },
);

const isValid: isValidFunction = function() {
  const userRequest = this;

  return new Date().getTime() < new Date(userRequest.expiredAt).getTime();
};

userRequestSchema.methods.isValid = isValid;

export const UserRequest = mongoose.model<UserRequestDocument>('UserRequest', userRequestSchema);
