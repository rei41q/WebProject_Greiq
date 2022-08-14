const postRepo = require("./post.repo");

const createPost = async ({ title, image, body, authUser }) => {
  return await postRepo.createPost({
    title,
    image,
    body,
    authUser,
  });
};

const checkWriterId = async (writerId) => {
  return await postRepo.checkWriterId(writerId);
};

const getPostsWithPageNumber = async ({
  searchPostTitle,
  sortOption,
  pageNumber,
}) => {
  return await postRepo.getPostsWithPageNumber({
    searchPostTitle,
    sortOption,
    pageNumber,
  });
};

const getAllPost = async ({
    searchPostTitle,
    sortOption,
  }) => {
    return await postRepo.getAllPost({
      searchPostTitle,
      sortOption,
    });
  };

const getDetailPost = async (postId) => {
  return await postRepo.getDetailPost(postId);
};
const getPostbyWriter = async ({
  writerId,
  searchPostTitle,
  sortOption,
  pageNumber,
}) => {
  return await postRepo.getPostbyWriter({
    writerId,
    searchPostTitle,
    sortOption,
    pageNumber,
  });
};

const editPost = async ({ title, image, body, postId }) => {
  const checkpostId = await postRepo.getOnePost(postId);
  if (checkpostId) {
    return await postRepo.editPost({
      title,
      image,
      body,
      postId,
    });
  } else {
    return null;
  }
};

const FunctionPostService = {
  createPost,
  getAllPost,
  getDetailPost,
  editPost,
  getPostbyWriter,
  checkWriterId,
  getPostsWithPageNumber
};

module.exports = FunctionPostService;
