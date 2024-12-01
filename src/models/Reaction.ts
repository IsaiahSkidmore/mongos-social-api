
import { Schema, Document, ObjectId, Types } from 'mongoose';
import dayjs from 'dayjs';

interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Schema.Types.Date;
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          return value.length <= 280;
        },
        message: 'String must be less than 280 characters long'
      }
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp:any) => dayjs(timestamp).format('MM/DD/YYYY')
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default reactionSchema;
