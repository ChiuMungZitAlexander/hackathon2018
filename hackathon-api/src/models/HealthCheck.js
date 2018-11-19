import mongoose, { Schema } from 'mongoose';


function transform(doc, ret) {
  delete ret._id;
  return ret;
}

const healthCheckSchema = new Schema({
  result: Number,
  user: { type: String, ref: 'User' },
  watchdog: { type: Schema.Types.ObjectId, ref: 'Watchdog' },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true, versionKey: false, transform },
});

class HealthCheckClass {
  static findByWatchdog(watchdog) {
    return this.find({ watchdog: watchdog.id || watchdog }).sort('-createdAt').populate('watchdog').exec();
  }

  static findByUser(user) {
    return this.find({ user: user.id || user }).sort('-createdAt').populate('watchdog').exec();
  }

  static findFreshByUser(user, sinceDate) {
    return this.find({ user: user.id || user, createdAt: { $gt: sinceDate } }).sort('-createdAt').populate('watchdog').exec();
  }

  get isSatisfied() {
    const [min, max] = this.watchdog.spec;
    return min <= this.result && this.result <= max;
  }
}

healthCheckSchema.loadClass(HealthCheckClass);

export default mongoose.model('HealthCheck', healthCheckSchema);
