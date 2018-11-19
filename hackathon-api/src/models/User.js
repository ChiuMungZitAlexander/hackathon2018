import mongoose, { Schema } from 'mongoose';

function transform(doc, ret) {
  delete ret.password;
  delete ret._id;
  return ret;
}

function transformProfile(doc, ret) {
  delete ret.id;
  return ret;
}

const profileSchema = new Schema({
  name: String,
  gender: String,
  birthday: Date,
  avatar: String,
}, {
  _id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true, transform: transformProfile },
});

class ProfileClass {
  get age() {
    const now = new Date();
    return now.getFullYear() - this.birthday.getFullYear();
  }
}

profileSchema.loadClass(ProfileClass);

const userSchema = new Schema({
  _id: String,
  password: String,
  profile: profileSchema,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true, versionKey: false, transform },
});

class UserClass {
  set id(value) {
    this._id = value;
  }

  validPassword(password) {
    return this.password === password;
  }
}

userSchema.loadClass(UserClass);

export default mongoose.model('User', userSchema);
