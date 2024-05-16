const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: "Title is required",
    },
    description: {
      type: String,
      required: "Description is required",
    },
    coverUrl: {
      type: String,
      required: "Cover image url is required",
      validate: {
        validator: function (url) {
          try {
            new URL(url);
            return true;
          } catch (error) {
            return false;
          }
        },
        message: "Invalid cover image url",
      },
    },
    price: {
      type: Number,
      required: "Price is required",
    },
    m2: {
      type: Number,
      required: "M2 is required",
    },
    numberOfRooms: {
      type: Number, 
      required: "Number of rooms is required"
    },
    orientation: {
      type: String,
      enum: ["north", "south", "east", "west", "northeast", "southeast", "northwest", "southwest"],
    },
    restored: {
      type: Boolean,
      default: false,
    },
    visited: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      required: "Source of finding the property is required",
    },
    address: {
      type: String,
      required: "Address is required",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    tags: [String],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        //ret.location = ret.location.coordinates.reverse();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

propertySchema.index({ location: "2dsphere" }); 

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
