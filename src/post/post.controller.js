    const postService = require("./post.service");

    const error500 = "Something went wrong. Please try again later";
    const updatesuccess = "Update successful";

    const errorMessage = {
    error500,
    };

    const postUser = async (req, res) => {
    try {
        const { title, image, body } = req.body;
        const authUser = req.auth;
        const createPost = await postService.postService({
        title,
        image,
        body,
        authUser,
        });

        return res.status(200).json(createPost);
    } catch (error) {
        return res.status(500).json({ message: errorMessage.error500 });
    }

    //   const createPost = await Post.create({
    //     title : title,
    //     image : image,
    //     body : body,
    //     userId : authUser.id
    //   })
    };

    const getAllPost = async (req, res) => {
    try {
        const {writer}  = req.query;
        console.log(writer)
        if (writer) {
        const servicebyWriter = await postService.getPostbyWriter(writer);
        return res.json(servicebyWriter);

        } else {
        const serviceAllPost = await postService.getAllPost();

        return res.json(serviceAllPost);
        }
    } catch (error) {
        return res.status(500).json({ message: errorMessage.error500 });
    }
    };

    const getOnePost = async (req, res) => {
    try {
        const { postID } = req.params;
        const getOnePost = await postService.getOnePost(postID);

        return res.json(getOnePost);
    } catch (error) {
        return res.status(500).json({ message: errorMessage.error500 });
    }
    };

    const editPost = async (req, res) => {
    try {
        const { postID } = req.params;

        const { title, image, body } = req.body;

        const updatePost = await postService.editPost({
        title,
        image,
        body,
        postID,
        });

        if (updatePost) return res.json({ message: updatesuccess });
    } catch (error) {
        return res.status(500).send({ message: errorMessage.error500 });
    }
    };
    const functionPost = {
    postUser,
    getAllPost,
    getOnePost,
    editPost,
    };

    module.exports = functionPost;
