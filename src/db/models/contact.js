import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true | false,
    },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ('work', 'home', 'personal'),
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
const Contact = model('contacts', contactSchema);
export default Contact;
