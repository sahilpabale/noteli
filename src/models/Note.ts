import { Schema, model } from "mongoose";

interface Note {
  content: string;
  date: Date;
  user: string;
}

const schema = new Schema<Note>({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model<Note>("Note", schema);
