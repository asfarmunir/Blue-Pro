import  { model, models, Schema, } from 'mongoose';


// Define the Group schema
const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['private', 'public'],
      required: true,
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User', // Referencing the User model
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },

      }
    ],
    pendingApprovals: [
      {
        user:{
        type: Schema.Types.ObjectId,
        ref: 'User', // Referencing the User model
      },
      requestedAt : {
        type: Date,
        default: Date.now,
      },

      }
    ],
    category: {
      type: String,
      required: true,
      trim: true,
      default: 'General',
    },
    description: {
      type: String,
      trim: true,
    },
    grpImage: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt'
  }
);

// Export the model
const Group = models.Group || model("Group", GroupSchema);
export default Group;
