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

const getAllPostWithFeatures = async ({
    searchPostTitle,
    sortOption,
    pageNumber
  }) => {
    return await postRepo.getAllPostWithFeatures({
      searchPostTitle,
      sortOption,
      pageNumber
    });
  };

  const getAllPost = async () => {
    return await postRepo.getAllPost();
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

const editPost = async ({ title, image, body, authUserId, postId}) => {

    return await postRepo.editPost({
      title,
      image,
      body,
      authUserId,
      postId,
    });
};

const checkAuthId = async ({postId, authUserId}) =>{

    return await postRepo.checkAuthId({postId,authUserId})
}

const checkOnePost= async ({postId}) => {
    return await postRepo.checkOnePost({postId})
}

const FunctionPostService = {
  createPost,
  getAllPost,
  getDetailPost,
  editPost,
  checkOnePost,
  getPostbyWriter,
  checkWriterId,
  getAllPostWithFeatures,
  checkAuthId
};

module.exports = FunctionPostService;