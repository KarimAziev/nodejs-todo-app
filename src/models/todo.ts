import { model, Schema } from 'mongoose';

const Todo = model(
  'Todo',
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      status: {
        type: Boolean,
        required: true,
      },
    },
    { timestamps: true }
  )
);

export default Todo;
