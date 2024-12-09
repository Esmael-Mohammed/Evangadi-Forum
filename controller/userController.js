const bcrypt=require('bcrypt')
const {StatusCodes}=require('http-status-codes')
//db connection
const dbConnection = require("../DbConfiger/dbConfig.js");

async function register(req, res) {
  const { userName, firstName, lastName, email, password } = req.body;
  if (!email || !password || !firstName || !lastName || !userName) {
    return res
      .status(400)
      .json({ msg: "Please provide all required fields" });
    }
    try {
        const[existingUser]=await dbConnection.query("SELECT userName,userid from users where userName=? or email=?",[userName,email]);
        if(existingUser.length > 0){
          return res.status(StatusCodes.BAD_REQUEST).json({msg:"User is already exist"});
        }

        if(password.length < 8){
          return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be at least 8 characters!"});
        }
        // password encrypt
        const salt =await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);

      await dbConnection.query(
        "INSERT INTO users(userName,firstName,lastName,email,password) VALUES (?,?,?,?,?)",
        [userName, firstName, lastName, email, hashPassword]
      );
      return res.status(StatusCodes.CREATED).json({msg:"User registered successfully"});
    } catch (error) {
      console.log(error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "something went wrong,try again later!" });
    }
  
}
async function login(req, res) {
const {email,password}=req.body;
if(!email || !password){
  return res.status(StatusCodes.BAD_REQUEST).json({msg:"please enter all require fildes"})
}
try {
  const [userExisting]=await dbConnection.query("SELECT userName,userid,password from users where email=?", [email]);
  if(userExisting.length===0){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"Invalid credental!"});
  }
  //decreypt password
  const passwordMatch=await bcrypt.compare(password,userExisting[0].password);
  if(!passwordMatch){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"Invalid credental!"});
  }
  
} catch (error) {
  console.log(error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "something went wrong,try again later!" });
}

}
async function checkUser(req, res) {
  res.send("check user");
}
module.exports = { register, login, checkUser };
