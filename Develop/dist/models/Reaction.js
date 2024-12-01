import { Schema, Types } from 'mongoose';
import dayjs from 'dayjs';
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
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
        get: (timestamp) => dayjs(timestamp).format('MM/DD/YYYY')
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});
export default reactionSchema;
