 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}, {
  timestamps: true
});

// GLOBAL TRANSFORM for both toJSON and toObject
function clean(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  delete ret.password;
  return ret;
}

userSchema.set('toJSON', { transform: clean });
userSchema.set('toObject', { transform: clean });

userSchema.pre('save',async function(next) { 

    if (!this.isModified('password')) {
        return next();
    }

    try {
       const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
       next();    
    } catch (error) {
        next(error);
    }
}) 

module.exports = mongoose.model('User', userSchema);
