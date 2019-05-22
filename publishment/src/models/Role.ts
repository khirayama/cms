import mongoose from 'mongoose';

export type RoleDocument = mongoose.Document & {
  name: string;
};

const roleSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  },
);

export const Role = mongoose.model<RoleDocument>('Role', roleSchema);
