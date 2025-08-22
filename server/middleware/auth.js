const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');

  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("token", token);

    console.log("decoded", decoded);


    const user = await User.findById(decoded.id); // Assuming decoded contains userId


    // console.log("user", decoded);


    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    ;
    req.user = { userId: user._id, name: user.username, isAdmin: user.isAdmin, role: user.role }; // Pass user ID and name
    next();
  } catch (err) {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("token",token);

    // console.log("decoded", decoded);
    res.status(400).json({ error: 'Invalid token' });
  }
  
};


module.exports = auth;
