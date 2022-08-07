const userService = require("./user.service");

const error500 = "Something went wrong. Please try again later";
const updateSuccess = "Update successful";

const errorMessage = {
error500,
};

const getAllUser = async (req,res) => {
  const dataUser = await userService.getAllUser();
  return res.json(dataUser);
}

const editUser = async (req, res) => {
  try {
    const {fullname, email, password } = req.body;
    const authUser = req.auth;

    await userService.editUser({
      fullname,
      email,
      password,
      authUser
    })
    return res.json(updateSuccess);

  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500});
   }
  }


const createUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const recordUser = await userService.createUser({
      fullname,
      email,
      password,
    });
    return res.json(recordUser);
  } catch (error) {
    res.send(error);
    // return res.status(500).json({ message: "Kesalahan server, silahkan coba lagi nanti" });
  }
};

const userController = {
  createUser,
  getAllUser,
  editUser
};

module.exports = userController;
