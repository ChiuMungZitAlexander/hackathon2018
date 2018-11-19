import mongoose, { Schema } from 'mongoose';

export const HEALTH_STATES = {
  HEALTHY: 'healthy',
  UNHEALTHY: 'unhealthy',
  UNKNOWN: 'unknown',
};

function transform(doc, ret) {
  delete ret._id;
  return ret;
}

const healthReportSchema = new Schema({
  state: { type: String, enum: Object.values(HEALTH_STATES), default: HEALTH_STATES.UNKNOWN },
  member: { type: Schema.Types.ObjectId, ref: 'Member' },
  healthChecks: [{ type: Schema.Types.ObjectId, ref: 'HealthCheck' }],
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true, versionKey: false, transform },
});

class HealthReportClass {
  static async findByMember(member) {
    return this.find({ member: member.id || member }).sort('-createdAt');
  }

  evaluateState() {
    const satisfications = this.healthChecks.map(z => z.isSatisfied);
    if (satisfications.every(z => !!z)) {
      this.state = HEALTH_STATES.HEALTHY;
    } else {
      this.state = HEALTH_STATES.UNHEALTHY;
    }
  }
}

healthReportSchema.loadClass(HealthReportClass);

export default mongoose.model('HealthReport', healthReportSchema);
