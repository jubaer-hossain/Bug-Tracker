import catchAsync from '../middlewares/catchAsync';
import Project from '../models/Project';
import AppError from '../../utils/AppError';
import sendData from '../../utils/response/sendData';
import {
  getOne,
} from './handlerFactory';
import sendMessage from '../../utils/response/sendMessage';

export const createProject = catchAsync(async (req, res, next) => {
  res.setHeader('Content-type', 'application/json');

  const userId = req.params.uid;

  if (!req.body.name) return next(new AppError('Provide project name.', 400));

  const body = {
    ...req.body,
    manager: userId,
  };

  const projectInfo = await Project.create(body);

  if (!projectInfo) {
    return next(new AppError('Somthing wrong.', 400));
  }

  return sendData(res, projectInfo);
});

export const getEachManagerProjects = catchAsync(async (req, res, next) => {
  res.setHeader('Content-type', 'application/json');

  const userId = req.params.uid;
  const projectInfo = await Project.find({ tester: userId });
  if (!projectInfo) {
    return next(new AppError('user not found.', 400));
  }

  for (let i = 0; i < projectInfo.length; i += 1) {
    projectInfo[i].tester = undefined;
  }
  return sendData(res, projectInfo);
});

export const updateProject = catchAsync(async (req, res, next) => {
  res.setHeader('Content-type', 'application/json');
  const id = req.params.id;
  if (!req.body.name) return next(new AppError('Provide project name.', 400));
  if (!req.body.status) return next(new AppError('Provide project status.', 400));
  const data = await Project.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  if (!data) {
    return next(new AppError(`Cannot update Project with id=${id}. Maybe User was not found!`, 500));
  } else {
    return sendMessage(res, 200, 'ok', 'Project updated successfully.');
  }
});

export const getActiveProject = catchAsync(async (req, res, next) => {
  res.setHeader('Content-type', 'application/json');
  const data = await Project.find({status: { $eq :'running'}})
  return sendData(res, data);
});

export const getSingleProject = getOne(Project);
