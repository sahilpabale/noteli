import { Schema, model } from "mongoose";

interface User {
  name: string;
  uid: string;
  email: string;
}

const schema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
});

export default model<User>("User", schema);
