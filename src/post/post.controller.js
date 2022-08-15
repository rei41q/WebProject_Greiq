const postService = require("./post.service");
const error500 = "Something went wrong. Please try again later";
const error406 = "Post Not Found";
const error412 = "Writer ID doesn't exist";
const error401 = "Authorization failed" 
const updatesuccess = "Update successful"
const errorMessage = {
  error500,
  error406,
  error412,
  error401,
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

        if(resultPostbyWriter!="")  //JIKA HASIL FITUR ADA OLEH ID PENULIS INI, MAKA AKAN MENGEMBALIKAN DATA TERSEBUT
        return res.status(200).json(resultPostbyWriter); 

        else return res.status(400).json({ message: errorMessage.error406 }); //JIKA TIDAK ADA, MAKA AKAN MENGEMBALIKAN STATUS 406 (POST NOT FOUND) 
      }

      //JIKA TIDAK ADA ID PENULIS INI, RETURN Writer ID doesn't exist
      else return res.status(412).json({ message: errorMessage.error412 });
    } 
        
    else {
        //JIKA USER TIDAK MEMILIH WRITER ID, MAKA AKAN MASUK PADA GET ALL POST, 
        
        //GET ALL POST MEMILIK 3 FITUR
        
        if(searchPostTitle || sortOption || pageNumber){
        const getAllPostWithFeatures = await postService.getAllPostWithFeatures({
          searchPostTitle,
          sortOption,
          pageNumber
        });
          if (getAllPost !="") { //JIKA POST ADA, MAKA AKAN MENGEMBALIKAN DATA PADA POST
            return res.status(200).json(getAllPostWithFeatures);
          } else { //JIKA POST TIDAK ADA, MAKA AKAN MENGEMBALIKAN POST NOT FOUND
            return res.status(406).json({ message: errorMessage.error406 });
          }
        }
        else{
            // JIKA USER TIDAK MEMILIH PALING TIDAK SALAH SATU DARI FITUR, MAKA AKAN GET ALL POST
            const getAllPost = await postService.getAllPost();

              if (getAllPost !="") { //JIKA POST ADA, MAKA AKAN MENGEMBALIKAN DATA PADA POST
                return res.status(200).json(getAllPost);
              } else {  //JIKA POST TIDAK ADA, MAKA AKAN MENGEMBALIKAN POST NOT FOUND
                return res.status(406).json({ message: errorMessage.error406 });
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
      const getDetailPost = await postService.getDetailPost(postId);

      return res.status(200).json(getDetailPost);

    }
     
    else return res.status(406).json(errorMessage.error406);

  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
};

const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const { title, image, body } = req.body;
    
    const  authUser  = req.auth;

    const  authUserId = authUser.id;

    const checkpostId = await postService.checkOnePost({postId});

    const checkAuthId = await postService.checkAuthId(
        {   
            postId, 
            authUserId
        });

    if (checkpostId && checkAuthId) {

    const resultEditPost = await postService.editPost({
      title,
      image,
      body,
      authUserId,
      postId,
    });
    if(resultEditPost)
    return res.status(200).send({ message: updatesuccess });
    
    else 
    return res.status(406).send({ message: errorMessage.error406 });

    }
    else if(!checkAuthId)
    return res.status(406).send({ message: errorMessage.error401 });
    
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
