import catchAsync from '../middlewares/catchAsync';
import AppError from '../../utils/AppError';
import Comment from '../models/Comment';
import Issue from '../models/Issue';
import sendMessage from '../../utils/response/sendMessage';
import sendData from '../../utils/response/sendData';

export const createComment = catchAsync(async (req, res, next) => {
  res.setHeader('Content-type', 'application/json');

  const userId = req.params.uid;
  const issueId = req.params.issueid;

  if (!req.body.text) return next(new AppError('Provide comment text.', 400));

  const body = {
    ...req.body,
    owner: userId,
    issue: issueId,
  };

  const commentInfo = await Comment.create(body);
  if (!commentInfo) {
    return sendMessage(res, 400, 'failed', 'somthing wrong.');
  }

  // create relation between Issue and comment
  await Issue.findOne({
    _id: issueId,
  }, (err, data) => {
    if (data) {
      data.comments.push(commentInfo._id);
      data.save();
    }
  });
  return sendData(res, commentInfo);
});

export const removeComment = () => {

};
