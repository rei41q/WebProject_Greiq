const bcrypt = require("bcrypt");
const userRepo = require("./user.repo");
const saltRound = 10;

const getAllUser = async () => {
   const getAllUserinRepo = await userRepo.getAllUser();
   return getAllUserinRepo;
}


const createUser = async ({ fullname, email, password }) => {
  const hashPassword = await bcrypt.hash(password, saltRound);

  const checkEmailUser = await userRepo.checkEmailAllUser(email);

  if(!checkEmailUser){
  const getUserRepo = await userRepo.createUser({ fullname, email, password: hashPassword });
  return getUserRepo;
  }
  else return null;
};

const editUser = async({  fullname, email, password, userId, authEmail}) =>{

  const hashedPassword = await bcrypt.hash(password, saltRound)

  //JIKA EMAIL SAMA DENGAN EMAIL USER INI, TAPI HANYA MAU UPDATE FULL NAMENYA
  // const checkSameEmail =  await userRepo.checkSameEmail(email);

  // console.log("Email Check", checkSameEmail.email, "email pilihan", email)
  //------------------------------------------------------------------//

  //CEK EMAIL YANG INGIN DIUPDATE ADA ATAU ENGGA DALAM TABEL USERS

  const checkEmailAllUser = await userRepo.checkEmailAllUser(email);

  console.log("auth email", authEmail)

  if(!checkEmailAllUser || checkSameEmail==authEmail ){
      const getUserRepo = await userRepo.editUser({
      fullname, 
      email, 
      password : hashedPassword, 
      userId
    })
    return getUserRepo;
  }
  else return null;
}
const userService = {
  createUser,
  getAllUser,
  editUser 
};

module.exports = userService;
