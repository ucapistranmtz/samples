const {createUserService}= require('../services/user.service');

const createUser = async (req,res)=> {
    try {
        
        const newUser = (await createUserService(req.body));
       // delete newUser._id;
        //delete newUser.__v;
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports= {createUser};