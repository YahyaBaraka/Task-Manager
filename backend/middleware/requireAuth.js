const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

require("dotenv").config();
const SECRET = process.env.SECRET;

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const {id} = jwt.verify(token, SECRET);
        console.log(id);

        req.user = await User.findOne({_id :id}).select('_id');
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'});
    }
}

module.exports = requireAuth;