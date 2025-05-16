 const User = require('../models/user.model');

 const createUserService= async (data)=> {
    const user = new User(data);
    return await user.save();
 }

 module.exports = { createUserService };