const bcrypt = require("bcrypt");
const userRepo = require("./user.repo");


const getAllUser = async () => {
   const getAllUserinRepo = await userRepo.getAllUser();
   return getAllUserinRepo;
}


const createUser = async ({ fullname, email, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const checkEmailUser = await userRepo.checkEmailAllUser(email);

  if(!checkEmailUser){
  const getUserRepo = await userRepo.createUser({ fullname, email, password: hashPassword });
  return getUserRepo;
  }
  else return null;
};

const editUser = async({  fullname, email, password, userId}) =>{

  const hashedPassword = await bcrypt.hash(password, saltRound)

  //JIKA EMAIL SAMA DENGAN EMAIL USER INI, TAPI HANYA MAU UPDATE FULL NAMENYA
  const checkSameEmail =  await userRepo.checkSameEmail(email); 
  //------------------------------------------------------------------//

  //CEK EMAIL YANG INGIN DIUPDATE ADA ATAU ENGGA DALAM TABEL USERS

  const checkEmailAllUser = await userRepo.checkEmailAllUser(email);

  if(!checkEmailAllUser && !checkSameEmail){
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
