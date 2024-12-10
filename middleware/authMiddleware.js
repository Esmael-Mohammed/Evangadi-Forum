const {StatusCodes}=require('http-status-codes')
const jwt=require('jsonwebtoken')
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Authentication invalid!"});
  }
  try {
    const {userName,userid}=jwt.verify(authHeader,'secret');
    next()

    res.status(StatusCodes.OK).json({authencateUser})

  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({msg:'authentication Invalid!'})
  }

}
module.exports=authMiddleware;