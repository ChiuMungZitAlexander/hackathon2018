import mongoose, { Schema } from 'mongoose';


function transform(doc, ret) {
  delete ret._id;
  return ret;
}

const notificationSchema = new Schema({
  message: String,
  source: String,
  user: { type: String, ref: 'User' },
  readAt: Date,
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true, versionKey: false, transform },
});

class NotificationClass {
  static findByUser(user) {
    return this.find({ user: user.id || user });
  }

  static findUnreadByUser(user) {
    return this.findByUser(user).where({ readAt: null });
  }
}

notificationSchema.loadClass(NotificationClass);

export default mongoose.model('Notification', notificationSchema);
