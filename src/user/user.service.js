const bcrypt = require("bcrypt");
const userRepo = require("./user.repo");
const { User } = require("../database/models")

const emailExist = "This email is already being used, Please choose another email"
const updatesuccess = "Update successful"
const registrationsuccessful = "Congratulations! Your account has been created"
const errorMessage = { 
  emailExist
}
const getAllUser = async () => {
   const getAllUserinRepo = await userRepo.getAllUser();
   return getAllUserinRepo;
}


const createUser = async ({ fullname, email, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const checkUser = await User.findOne({
    where:{ email: email }
  })

  if(!checkUser){
  await userRepo.createUser({ fullname, email, password: hashPassword });
  return registrationsuccessful
  }
  else return errorMessage.emailExist
};

const editUser = async({  fullname, email, password, authUser}) =>{
  const checkUser = await User.findOne({
    where:{ email: email }
  })
  if(!checkUser){
    console.log("masuk")
      return await userRepo.editUser({
      fullname, 
      email, 
      password, 
      authUser
    })
  }
  else return errorMessage.emailExist;
}
const userService = {
  createUser,
  getAllUser,
  editUser 
};

module.exports = userService;
