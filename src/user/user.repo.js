const { User } = require("../database/models");

const getAllUser = async () => {
  return await User.findAll()
}

const createUser = async ({ fullname, email, password }) => {
  return await User.create({
    fullname,
    email,
    password,
  });
};

const checkUser = async (email) =>{
  return await User.findOne({
  where:{ email: email }
})
}

  const editUser = async ({fullname, email, password, authUser}) =>{
  await User.update({
    fullname,
    email,
    password
  },{
    where:{
        id : authUser.id
    }
  })
  }
const userRepo = {
  createUser,
  getAllUser,
  editUser,
  checkUser
};

module.exports = userRepo;
