    const { Post } = require("../database/models");
    const { Op, where } = require("sequelize");
const e = require("express");

    const createPost = async ({ title, image, body, authUser }) => {
    return await Post.create({
        title: title,
        image: image,
        body: body,
        userId: authUser.id,
    });
    };
    const getAllPost = async () => {
            return await Post.findAll();
    }
    const getAllPostWithFeatures = async ({ searchPostTitle, sortOption, pageNumber }) => {

        if (!sortOption) {
            //DEFAULT SORT
            orderBy = "id";
            sortOption = "ASC";
        }

        if (sortOption || pageNumber || searchPsostTitle) {

            if (sortOption && !pageNumber && !searchPostTitle) {

            return await Post.findAll({
                order: [[orderBy, sortOption]],
            });
          
            } 
            else if(sortOption && pageNumber && !searchPostTitle){

                return await Post.findAll({
                    order: [[orderBy, sortOption]],
        
                    offset: (pageNumber - 1) * 5 + 1 - 1,
                    limit: 5,
                })
            }
            else if (sortOption && !pageNumber && searchPostTitle) {

            return await Post.findAll({
                order: [[orderBy, sortOption]],
    
                where: {
                    title: {
                        [Op.substring]: searchPostTitle, //Search LIKE %PostTitle%
                    },
    
                },
            });
            }
            else if (sortOption && pageNumber && searchPostTitle) {
  
            return await Post.findAll({
                order: [[orderBy, sortOption]],
    
                offset: (pageNumber - 1) * 5 + 1 - 1,
                limit: 5,
    
                where: {
                    title: {
                        [Op.substring]: searchPostTitle, //Search LIKE %PostTitle%
                    },
    
                },
            });
            }

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
        
    if (!sortOption) {
        //DEFAULT SORT
        orderBy = "id";
        sortOption = "ASC";
    }

    // if (!pageNumber) {
    //     //DEFAULT PageNumber (Halaman 1)
    //     pageNumber = 1;
    // }

    if (writerId || sortOption || pageNumber || searchPsostTitle) {

        if (writerId && sortOption && !pageNumber && !searchPostTitle) {

        return await Post.findAll({
            order: [[orderBy, sortOption]],

            where: {
            // [Op.or]:[  //KONDISI OR PADA DATABASE SESUAI KEINGINAN USER

            userId: writerId,
            },
        });
      
        } 
        else if(writerId && sortOption && pageNumber && !searchPostTitle){

            return await Post.findAll({
                order: [[orderBy, sortOption]],
    
                offset: (pageNumber - 1) * 5 + 1 - 1,
                limit: 5,
    
                where: {
                // [Op.or]:[  //KONDISI OR PADA DATABASE SESUAI KEINGINAN USER
    
                userId: writerId,
                },
            })
        }
        else if (writerId && sortOption && !pageNumber && searchPostTitle) {

        return await Post.findAll({
            order: [[orderBy, sortOption]],

            where: {
                userId: writerId ,
                title: {
                    [Op.substring]: searchPostTitle, //Search LIKE %PostTitle%
                },

            },
        });
        }
        else if (writerId && sortOption && pageNumber && searchPostTitle) {

        return await Post.findAll({
            order: [[orderBy, sortOption]],

            offset: (pageNumber - 1) * 5 + 1 - 1,
            limit: 5,

            where: {
                userId: writerId ,
                title: {
                    [Op.substring]: searchPostTitle, //Search LIKE %PostTitle%
                },

            },
        });
        }
    } 
    };
    const checkAuthId = async ({postId, authUserId}) =>{

        return await Post.findOne({
            where:{
                id : postId,
                userId : authUserId
            }
        })

    }

    const editPost = async ({ title, image, body, authUserId, postId}) => {

    return await Post.update(
        {
        title: title,
        image: image,
        body: body,
        },
        {
        where: {
            id: postId,
            userId : authUserId
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

    const checkOnePost = async ({postId}) =>{

        return await Post.findOne({
            where: {
                id : postId,
            },
        })
    }
    const functionPostRepo = {
    createPost,
    getAllPost,
    getDetailPost,
    editPost,
    getPostbyWriter,
    checkWriterId,
    checkOnePost,
    getAllPostWithFeatures,
    checkAuthId
    };

    module.exports = functionPostRepo;