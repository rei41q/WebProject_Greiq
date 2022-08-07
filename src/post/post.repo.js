const { Post } = require("../database/models")

const createPost = async ({title, image,body, authUser}) => {
   return await Post.create({
            title : title,
            image : image,
            body : body,
            userId : authUser.id}
        )
}
const getAllPost = async () => {
    return await Post.findAll();
}

const getOnePost = async (postID) =>{
    return await Post.findOne({
        where:{
            id: postID
        }
    });
}

const getPostbyWriter = async (writer) =>{
    return await Post.findAll({
        where:{
            userId : writer
        }
    });
}

const editPost = async ({
    title,
    image,
    body,
    postID
}) => {
return await Post.update({
    title: title,
    image: image,
    body: body
},
{
    where:{
        id: postID
    }
}
);
}
const functionPostRepo = {
    createPost,
    getAllPost,
    getOnePost,
    editPost,
    getPostbyWriter
}

module.exports = functionPostRepo;