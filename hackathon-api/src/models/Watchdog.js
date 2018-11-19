import mongoose, { Schema } from 'mongoose';


function transform(doc, ret) {
  delete ret._id;
  return ret;
}

const watchdogSchema = new Schema({
  name: String,
  spec: [Number],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true, versionKey: false, transform },
});

class WatchdogClass {
}

watchdogSchema.loadClass(WatchdogClass);

export default mongoose.model('Watchdog', watchdogSchema);
