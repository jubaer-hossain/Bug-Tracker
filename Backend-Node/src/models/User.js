import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'please provide your email'],
    lowercase: true,
    unique: true,
  },
  username: String,
  password: {
    type: String,
    minlength: 8,
    select: false,
  },
  otp: {
    type: String,
    select: false,
  },
  createdAtOTP: {
    type: Date,
    select: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['admin', 'tester', 'developer'],
    default: 'developer',
  },
});

// get User from email
userSchema.pre('save', function (next) {
  if (this.email) {
    this.username = this.email.match(/^([^@]*)@/)[1];
  }
  next();
});

// hash passsword
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.comparePassword = async function(candidatePassword, userPassword) {
  const result = await bcrypt.compare(candidatePassword, userPassword);
  console.log(result);
  return result;
};

if (!mongoose.models.User) {
  mongoose.model('User', userSchema);
}

export default mongoose.models.User;
