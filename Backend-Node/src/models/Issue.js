import mongoose from 'mongoose';
import moment from 'moment';

const issueSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  assignee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  status: {
    type: String,
    enum: ['new', 'open', 'fixed', 're-test', 'rejected', 're-open', 'closed', 'deferred'],
    default: 'new',
  },
  deadline: {
    type: Date,
  },
  attachment: {
    type: String,
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },
  ],
  createAt: {
    type: String,
    default: moment(new Date(Date.now())).format('LLL'),
  },
  updatedAt: {
    type: String,
    default: moment(new Date(Date.now())).format('LLL'),
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

// Query middleware
issueSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'comments',
    select: 'createAt text owner',
  })
  .populate({
    path: 'manager',
    select: 'name email username',
  })
  .populate({
    path: 'assignee',
    select: 'name email username',
  })
  .populate({
    path: 'updatedBy',
    select: 'name email username',
  })
  .populate({
    path: 'project',
    select: 'name -issues -manager',
  })
  next();
});



if (!mongoose.models.Issue) {
  mongoose.model('Issue', issueSchema);
}

export default mongoose.models.Issue;
