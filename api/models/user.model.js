const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        birthDate: {
            type: Date,
            required: true,
        },
        avatar: {
            type: String,
        }
    },
    {
        timestamps: true,
        toJSON: {
          transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
          },
        },
    }
);

userSchema.pre("save", function (next) {
   if (this.isModified('password')) {
    bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next()
        })
        .catch(next);
   } else {
    next();
   }
});

userSchema.method("checkPassword", function (password) {
    return bcrypt.compare(password, this.password);
  });

const User = mongoose.model("User", userSchema);
module.exports = User;