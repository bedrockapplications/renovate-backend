const jwt = require('jsonwebtoken');
let User = require('../models/userModel');

//validate request
const tokenValidation = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (authorization && authorization.startsWith('Bearer')) {
            let token = req.headers.authorization.split(" ")[1];
            var decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findOne(
                { _id: decoded.user_id },
                { password: 0 }
              );
        
        if (!user){
            return res.json({ status: false, message: 'Unauthorized' });
        }
        req.user = user;
        req.authToken = token
        next();
        }else{
            return res.json({ status: false, message: 'Unauthorized' });
        }
    }
    catch (err) {
        // console.log("err----", err)
        return res.json({ status: false, message: err.message });;
    }
}


module.exports = {
    tokenValidation
}