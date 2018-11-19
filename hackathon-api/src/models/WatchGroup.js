import mongoose, { Schema } from 'mongoose';
import Member from './Member';

function transform(doc, ret) {
  delete ret._id;
  return ret;
}

const watchGroupSchema = new Schema({
  name: String,
  watchdogs: [{ type: Schema.Types.ObjectId, ref: 'Watchdog' }],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true, versionKey: false, transform },
});

class WatchGroupClass {
  static async findByUser(user) {
    const memberships = await Member.findByUser(user);
    const ids = memberships.map(z => z.watchGroup);
    return this.find({ _id: ids });
  }

  addMember(user, role) {
    const doc = new Member({ user, role, watchGroup: this });
    return doc.save();
  }
}

watchGroupSchema.loadClass(WatchGroupClass);

export default mongoose.model('WatchGroup', watchGroupSchema);
