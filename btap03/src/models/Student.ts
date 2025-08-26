import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  age: number;
  email: string;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
});

export default mongoose.model<IStudent>('Student', StudentSchema);
