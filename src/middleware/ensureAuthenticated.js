const jwt = require('jsonwebtoken')


function ensureAuthenticated(req, res, next){
  const authToken = req.headers.authorization
  if(!authToken) return res.status(401).json({ message: "Token not exists or expired!!" });


  const [, token] = authToken.split(" ")
  try {
    const sub  = jwt.verify(token, '9df571d4410759b96d0a3103301ee55d')
  
    req.user_id = sub

    return next()
  } catch (error) {
    return res.status(401).json({message: "User not authorized!!"})
  }
}

module.exports = ensureAuthenticated