const User = require('../models/user.model');
// Authentication Middleware
module.exports = async (req, res, next) => {
    req.user = null;

    if (req.session && req.session._id){
        // verify user from db
        req.user = await User.findOne({ _id: req.session._id, email: req.session.email });
    }
    next();
}
