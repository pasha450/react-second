const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      caseInsensitive: true // Case-insensitive matching for the index
    },
    message: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const ContactUs = mongoose.model("contact_us", contactSchema);
module.exports = ContactUs;
