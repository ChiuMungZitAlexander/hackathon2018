import mongoose, { Schema } from 'mongoose';
import HealthCheck from './HealthCheck';
import HealthReport from './HealthReport';

export const MEMBER_ROLES = {
  MEMBER: 'member',
  MAINTAINER: 'maintainer',
  REPORTER: 'reporter',
};

function transform(doc, ret) {
  delete ret._id;
  return ret;
}

const memberSchema = new Schema({
  role: { type: String, enum: Object.values(MEMBER_ROLES), default: MEMBER_ROLES.MEMBER },
  user: { type: String, ref: 'User', required: true },
  watchGroup: { type: Schema.Types.ObjectId, ref: 'WatchGroup', required: true },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true, versionKey: false, transform },
});

class MemberClass {
  static findByUser(user) {
    return this.find({ user: user.id || user });
  }

  static findByWatchGroup(watchGroup) {
    return this.find({ watchGroup: watchGroup.id || watchGroup });
  }

  async createHealthReport() {
    const [lastHealthReport = { createdAt: this.createdAt }] = await HealthReport.findByMember(this);
    const healthChecks = await HealthCheck.findFreshByUser(this.user, lastHealthReport.createdAt);
    if (!healthChecks.length) {
      return Promise.resolve(null);
    }
    const healthReport = new HealthReport({ member: this, healthChecks });
    healthReport.evaluateState();
    return healthReport.save();
  }
}

memberSchema.loadClass(MemberClass);

export default mongoose.model('Member', memberSchema);
