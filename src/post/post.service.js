const postRepo = require("./post.repo");

const createPost = async ({ title, image, body, authUserId }) => {
  return await postRepo.createPost({
    title,
    image,
    body,
    authUserId,
  });
};

const checkWriterIdExist = async (writerId) => {
  return await postRepo.checkWriterIdExist(writerId);
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
const getPostsbyWriter = async ({
  writerId,
}) => {
  return await postRepo.getPostsbyWriter({
    writerId,
  });
};

const getPostsByWriterWithFeatures = async ({
  writerId,
  searchPostTitle,
  sortOption,
  pageNumber,
}) => {
  return await postRepo.getPostsByWriterWithFeatures({
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

const checkpostIdExists= async ({postId}) => {
    return await postRepo.checkpostIdExists({postId})
}

const FunctionPostService = {
  createPost,
  getAllPost,
  getDetailPost,
  editPost,
  checkpostIdExists,
  getPostsbyWriter,
  checkWriterIdExist,
  getAllPostWithFeatures,
  checkAuthId,
  getPostsByWriterWithFeatures
};

module.exports = FunctionPostService;