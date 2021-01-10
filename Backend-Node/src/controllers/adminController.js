import User from '../models/User';
import Project from '../models/Project';
import {
  getAll,
} from './handlerFactory';

export const getUserList = getAll(User);
export const getProjectList = getAll(Project);
