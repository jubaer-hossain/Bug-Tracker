import catchAsync from '../middlewares/catchAsync';
import AppError from '../../utils/AppError';
import Issue from '../models/Issue';
import Project from '../models/Project';
import sendData from '../../utils/response/sendData';
import sendMessage from '../../utils/response/sendMessage';

export const createIssue = catchAsync(async (req, res, next) => {
  res.setHeader('Content-type', 'application/json');

  const userId = req.params.uid;
  const projectId = req.params.pid;

  const { name, description } = req.body;

  if (!name) return next(new AppError('Provide issue name.', 400));
  if (!description) return next(new AppError('Provide issue description.', 400));

  const body = {
    ...req.body,
    manager: userId,
  };

  const issueInfo = await Issue.create(body);

  if (!issueInfo) {
    return sendMessage(res, 400, 'failed', 'somthing wrong.');
  }

  // create relation between project and issue
  await Project.findOne({
    _id: projectId,
  }, (err, data) => {
    if (data) {
      data.issues.push(issueInfo._id);
      data.save();
    }
  });
  return sendData(res, issueInfo);
});


export const getIssues = catchAsync(async (req, res, next) => {
  res.setHeader('Content-type', 'application/json');

  const projectId = req.params.pid;

  const data = await Issue.find({project: {$eq: projectId}})
  return sendData(res, data);
});

export const getIssuesByAssignee = catchAsync(async (req, res, next) => {
  res.setHeader('Content-type', 'application/json');

  const userId = req.params.uid;

  const data = await Issue.find({assignee: {$eq: userId}})
  return sendData(res, data);
});
