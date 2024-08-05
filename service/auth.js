///const sessionIdToUserMap = new Map();
const jwt= require("jsonwebtoken");
const secret = "@@$$1808Anup";

function setUser(user){
  return jwt.sign({
    _id: user.id,
    email: user.email,
    role: user.role,
  }, 
  secret);
}

function getUser(token){
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};