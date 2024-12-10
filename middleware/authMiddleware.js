const {StatusCodes}=require('http-status-codes')
const jwt=require('jsonwebtoken')
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Authentication invalid!"});
  }
  const token=authHeader.split(' ')[1];
  console.log(authHeader)
  console.log(token)
  try {

    const {userName,userid}=jwt.verify(token,'secret');
    req.user={userName,userid}
    next()


  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({msg:'authentication Invalid!'})
  }

}
module.exports=authMiddleware;