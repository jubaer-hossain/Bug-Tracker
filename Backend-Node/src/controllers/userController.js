import catchAsync from '../middlewares/catchAsync';
import AppError from '../../utils/AppError';
import User from '../models/User';
import sendMessage from '../../utils/response/sendMessage';
import sendData from '../../utils/response/sendData';

export const updateUser = catchAsync(async (req, res, next) => {
    res.setHeader('Content-type', 'application/json');
    const id = req.params.id;
    const data = await User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    console.log(data)
    if (!data) {
        return next(new AppError(`Cannot update User with id=${id}. Maybe User was not found!`, 500));
    } else {
        return sendMessage(res, 200, 'ok', 'User updated successfully.');
    }
});

export const getActiveDevelopers = catchAsync(async (req, res, next) => {
    res.setHeader('Content-type', 'application/json');
    const data = await User.find({active: {$eq: true},role: { $eq :'developer'}})
    return sendData(res, data);
  });
