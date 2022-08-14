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

const getAllPost = async (req, res) => {
  //User bisa memilih sesuai keinginan

  try {
    const { writerId, sortOption, searchPostTitle, pageNumber } = req.query;

    //CEK PARAMETER WriterId ADA/NULL
    if (writerId) {
      //CEK WriterId ADA/NULL DALAM DATABASE
      const checkWriterId = await postService.checkWriterId(writerId);

      if (checkWriterId) {
        //AGAR WriterId JUGA BISA DI SORTING DAN PAGINATE
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

      //JIKA TIDAK ADA POST, RETURN POST NOT FOUND, ERROR STATUS (400)
      else return res.status(400).json({ message: errorMessage.error400 });
    } else {
      if (pageNumber) {

        //get Posts berdasarkan PageNumber
        const getPostsWithPageNumber = await postService.getPostsWithPageNumber(
          {
            searchPostTitle,
            sortOption,
            pageNumber,
          }
        );

        return res.status(200).json(getPostsWithPageNumber);
      } 
        else {
        //JIKA User tidak memilih pageNumber maka akan menghasilkan semua data post
        const getAllPost = await postService.getAllPost({
          searchPostTitle,
          sortOption,
        });

        if (getAllPost !="") {
          return res.status(200).json(getAllPost);
        } else {
          return res.status(400).json({ message: errorMessage.error400 });
        }
      }
    }
  } catch (error) {
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
  getAllPost,
  editPost,
  getDetailPost,
};

module.exports = functionPost;
