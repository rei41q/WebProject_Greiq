const postRepo = require("./post.repo")

const postService = async ({title, image,body, authUser}) =>{
    return await postRepo.createPost(
        {
        title, 
        image, 
        body, 
        authUser
    });

}

const getAllPost = async() => {
    return await postRepo.getAllPost();
}

const getOnePost = async(postID) =>{
    return await postRepo.getOnePost(postID)
}
const getPostbyWriter = async(writer) =>{
    return await postRepo.getPostbyWriter(writer)
}

const editPost = async({
    title,
    image,
    body,
    postID
}) =>{
    return await postRepo.editPost({
        title,
        image,
        body,
        postID
    })
}

const FunctionPostService = {
    postService,
    getAllPost,
    getOnePost,
    editPost,
    getPostbyWriter
}

module.exports = FunctionPostService;