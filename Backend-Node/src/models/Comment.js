import mongoose from 'mongoose';
import moment from 'moment';

const commentSchema = new mongoose.Schema({
  issue: {
    type: mongoose.Schema.ObjectId,
    ref: 'Issue',
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
  },
  createAt: {
    type: String,
    default: moment(new Date(Date.now())).format('LLL'),
  },
});

// Query middleware
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'owner',
    select: 'name email',
  });
  next();
});

if (!mongoose.models.Comment) {
  mongoose.model('Comment', commentSchema);
}

export default mongoose.models.Comment;
