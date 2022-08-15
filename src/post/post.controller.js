const postService = require("./post.service");
const error500 = "Something went wrong. Please try again later";
const error400 = "Post Not Found";

const errorMessage = {
  error500,
  error400,
};

const createPost = async (req, res) => {
  try {
    const { title, image, body } = req.body;
    const authUser = req.auth;
    const createPost = await postService.createPost({
      title,
      image,
      body,
      authUser,
    });

    return res.status(200).json(createPost);

  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
};

const getAllPostOrByWriter = async (req, res) => {

  //User bisa memilih fitur sesuai keinginan

  try {
    const { writerId, sortOption, searchPostTitle, pageNumber } = req.query;

    //CEK PARAMETER WriterId ADA/NULL
    if (writerId) {
      //CEK WriterId ADA/NULL DALAM DATABASE
      const checkWriterId = await postService.checkWriterId(writerId);

      if (checkWriterId) {
        //WriterId MEMILIKI 3 FITUR
        const resultPostbyWriter = await postService.getPostbyWriter({
          writerId,
          searchPostTitle,
          sortOption,
          pageNumber,
        });

        if(resultPostbyWriter!="")
        return res.status(200).json(resultPostbyWriter);
        else return res.status(400).json({ message: errorMessage.error400 });
      }

      //JIKA TIDAK ADA POST OLEH PENULIS INI, RETURN POST NOT FOUND, ERROR STATUS (400)
      else return res.status(400).json({ message: errorMessage.error400 });
    } 
        
    else {
        //JIKA USER TIDAK MEMILIH WRITER ID, MAKA AKAN MASUK PADA GET ALL POST, GET ALL POST MEMILIK 3 FITUR
        if(searchPostTitle || sortOption || pageNumber){
        const resultAllPostWithFeatures = await postService.getAllPostWithFeatures({
          searchPostTitle,
          sortOption,
          pageNumber
        });
          if (getAllPost !="") { //JIKA POST ADA, MAKA AKAN MENGEMBALIKAN DATA PADA POST
            return res.status(200).json(resultAllPostWithFeatures);
          } else { //JIKA POST TIDAK ADA, MAKA AKAN MENGEMBALIKAN POST NOT FOUND
            return res.status(400).json({ message: errorMessage.error400 });
          }
        }
        else{
            // JIKA USER TIDAK MEMILIH PALING TIDAK SALAH SATU DARI FITUR, MAKA AKAN GET ALL POST
            const getAllPost = await postService.getAllPost();

              if (getAllPost !="") { //JIKA POST ADA, MAKA AKAN MENGEMBALIKAN DATA PADA POST
                return res.status(200).json(getAllPost);
              } else {  //JIKA POST TIDAK ADA, MAKA AKAN MENGEMBALIKAN POST NOT FOUND
                return res.status(400).json({ message: errorMessage.error400 });
              }
            }
      }
    }
   catch (error) { //JIKA TERDAPAT ERROR YG TIDAK DIKETAHUI, STATUS (500)
    return res.status(500).json({ message: errorMessage.error500 });
  }
};

const getDetailPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const checkpostIdExists = await postService.getDetailPost(postId);

    if (checkpostIdExists) {
      const getOnePost = await postService.getDetailPost(postId);

      return res.status(200).json(getOnePost);

    }
     
    else return res.status(400).json(errorMessage.error400);

  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
};

const editPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const { title, image, body } = req.body;

    const updatePost = await postService.editPost({
      title,
      image,
      body,
      postId,
    });

    return res.json({ message: updatePost });
  } catch (error) {
    return res.status(500).send({ message: errorMessage.error500 });
  }
};
const functionPost = {
  createPost,
  getAllPostOrByWriter,
  editPost,
  getDetailPost,
};

module.exports = functionPost;
