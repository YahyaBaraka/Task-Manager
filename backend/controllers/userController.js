const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../env');


const createToken = (mongoID) => {
  return jwt.sign({id:mongoID}, SECRET, {expiresIn: '1h'});
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);

    //creating token
    const token = createToken(user._id);

    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body;

  console.log({email, password});

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);


    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = { signupUser, loginUser }