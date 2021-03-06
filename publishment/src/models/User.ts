import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

import { RoleDocument } from './Role';

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  role: mongoose.Types.ObjectId | RoleDocument;

  comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (
  this: UserDocument,
  candidatePassword: string,
  cb: (err: any, isMatch: any) => {},
) => void;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    role: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Role',
    },
  },
  {
    timestamps: true,
  },
);

export type AuthToken = {
  accessToken: string;
  kind: string;
};

userSchema.pre<UserDocument>('save', function(next) {
  const user: UserDocument = this;

  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(
      user.password,
      salt,
      () => {},
      (err: mongoose.Error, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      },
    );
  });
});

const comparePassword: comparePasswordFunction = function(candidatePassword, cb) {
  const user = this;

  bcrypt.compare(candidatePassword, user.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>('User', userSchema);
