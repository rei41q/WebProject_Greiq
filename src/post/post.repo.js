    const { Post } = require("../database/models");
    const { Op, where } = require("sequelize");

    const createPost = async ({ title, image, body, authUser }) => {
    return await Post.create({
        title: title,
        image: image,
        body: body,
        userId: authUser.id,
    });
    };

    const getAllPost = async ({ searchPostTitle, sortOption }) => {
    let orderBy = "title"; //Default Order

    if (!sortOption) {
        //DEFAULT SORT
        orderBy = "id";
        sortOption = "ASC";
    }

    if (searchPostTitle || sortOption) {
        if (searchPostTitle)
        return await Post.findAll({
            order: [[orderBy, sortOption]],

            where: {
            title: {
                [Op.substring]: searchPostTitle, //Search LIKE %PostTitle%
            },
            },
        });
        else if (sortOption) {
        return await Post.findAll({
            order: [["title", sortOption]],
        });
        } else {
        return await Post.findAll();
        }
    }
    };
    const getPostsWithPageNumber = async ({
    searchPostTitle,
    sortOption,
    pageNumber,
    }) => {
    if (!sortOption) {
        //DEFAULT SORT
        orderBy = "id";
        sortOption = "ASC";
    }

    if (!pageNumber) {
        //DEFAULT PageNumber (Halaman 1)
        pageNumber = 1;
    }

    if (searchPostTitle) {
        return await Post.findAll({
        order: [[orderBy, sortOption]],

        offset: (pageNumber - 1) * 5 + 1 - 1,
        limit: limit,

        where: {
            [Op.or]: [
            //KONDISI OR PADA DATABASE SESUAI KEINGINAN USER

            { userId: writerId },

            {
                title: {
                [Op.substring]: searchPostTitle, //Search LIKE %PostTitle%
                },
            },
            ],
        },
        });
    } else if (sortOption || pageNumber) {
        //JIKA SEARCH TIDAK ADA
        console.log("masuk pagenumber");
        return await Post.findAll({
        order: [[orderBy, sortOption]],

        offset: (pageNumber - 1) * 5 + 1 - 1,
        limit: 5,
        });
    } else {
        return null;
    }
    };

    const getDetailPost = async (postId) => {
    return await Post.findOne({
        where: {
        id: postId,
        },
    });
    };

    const getPostbyWriter = async ({
    writerId,
    searchPostTitle,
    sortOption,
    pageNumber,
    }) => {
    let orderBy = "title"; //Default Order

    if (!sortOption) {
        //DEFAULT SORT
        orderBy = "id";
        sortOption = "ASC";
    }

    if (!pageNumber) {
        //DEFAULT PageNumber (Halaman 1)
        pageNumber = 1;
    }

    if (writerId || sortOption || pageNumber || searchPostTitle) {

        if (writerId && sortOption && pageNumber && !searchPostTitle) {
            console.log("masuk not search PostTitle writer")
        return await Post.findAll({
            order: [[orderBy, sortOption]],

            offset: (pageNumber - 1) * 5 + 1 - 1,
            limit: 5,

            where: {
            // [Op.or]:[  //KONDISI OR PADA DATABASE SESUAI KEINGINAN USER

            userId: writerId,
            },
        });
        } else if (searchPostTitle) {
            console.log("masuk searchPostTitle writer")
        return await Post.findAll({
            order: [[orderBy, sortOption]],

            offset: (pageNumber - 1) * 5 + 1 - 1,
            limit: 5,

            where: {
                //KONDISI OR PADA DATABASE SESUAI KEINGINAN USER
                userId: writerId ,
                title: {
                    [Op.substring]: searchPostTitle, //Search LIKE %PostTitle%
                },

            },
        });
        }
    } else {
        return await Post.findAll({
        where: {
            userId: writerId,
        },
        });
    }
    };

    const editPost = async ({ title, image, body, postId }) => {
    return await Post.update(
        {
        title: title,
        image: image,
        body: body,
        },
        {
        where: {
            id: postId,
        },
        }
    );
    };
    const checkWriterId = async (writerId) => {
    return await Post.findOne({
        where: {
        userId: writerId,
        },
    });
    };

    const functionPostRepo = {
    createPost,
    getAllPost,
    getDetailPost,
    editPost,
    getPostbyWriter,
    checkWriterId,
    getPostsWithPageNumber,
    };

    module.exports = functionPostRepo;
