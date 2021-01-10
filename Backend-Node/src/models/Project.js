import mongoose from 'mongoose';
import moment from 'moment';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
  },
  createAt: {
    type: String,
    default: moment(new Date(Date.now())).format('LLL'),
  },
  deadline: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['running', 'completed', 'cancelled'],
    default: 'running',
  },
  issues: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Issue',
    },
  ],
});

// Query middleware
projectSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'manager',
    select: 'name email',
  }).populate({
    path: 'issues',
    select: '-project',
  });
  next();
});

if (!mongoose.models.Project) {
  mongoose.model('Project', projectSchema);
}

export default mongoose.models.Project;
