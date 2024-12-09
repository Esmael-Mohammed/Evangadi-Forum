const bcrypt=require('bcrypt')
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
          return res.status(400).json({msg:"User is already exist"});
        }

        if(password.length < 8){
          return res.status(400).json({msg:"password must be at least 8 characters!"});
        }
        // password encrypt
        const salt =await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);






      await dbConnection.query(
        "INSERT INTO users(userName,firstName,lastName,email,password) VALUES (?,?,?,?,?)",
        [userName, firstName, lastName, email, hashPassword]
      );
      return res.status(201).json({msg:"User registered successfully"});
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ msg: "something went wrong,try again later!" });
    }
  
}
async function login(req, res) {
  res.send("login");
}
async function checkUser(req, res) {
  res.send("check user");
}
module.exports = { register, login, checkUser };
