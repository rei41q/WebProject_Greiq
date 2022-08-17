    const { Post } = require("../database/models");
    const { Op, where } = require("sequelize");
    const e = require("express");
    let orderBy="title";
    let defaultOrderBy = "id";
    let defaultSortOption = "ASC";
    let pageFormula = 5 + 1 - 1 

    //DITARUH PADA VARIABLE GLOBAL AGAR MUDAH MAINTENANCE/UPDATE

    const createPost = async ({ title, image, body, authUserId }) => {
    return await Post.create({
        title: title,
        image: image,
        body: body,
        userId: authUserId,
    });
    };
    const getAllPost = async () => {

    return await Post.findAll();
        
    };

    const getAllPostWithFeatures = async ({
    searchPostTitle,
    sortOption,
    pageNumber,
    }) => {

    if (!sortOption) {
        //DEFAULT SORT
        orderBy = defaultOrderBy;
        sortOption = defaultSortOption;
    }           
            //CEK FITUR YG TELAH DIPILIH USER (
            //DIJADIKAN FUNCTION AGAR MUDAH DICEK/MAINTANCE/NAMBAH FITUR)

                function sortOptionIsSelected(){ 
                    if(sortOption && !pageNumber && !searchPostTitle){
                        return true;;
                    }
                return false;
                }
                function sortOptionAndPageNumberIsSelected(){
                    if(sortOption && pageNumber && !searchPostTitle){
                        return true;
                    }
                return false;
                }
                function sortOptionAndSearchIsSelected(){
                    if(sortOption && !pageNumber && searchPostTitle){
                        return true;
                    }
                return false;
                }
                function sortOptionPageNumberAndSearchIsSelected(){
                    if(sortOption && pageNumber && searchPostTitle){
                        return true;
                    }
                return false;
                }

    if (sortOptionIsSelected()==true) {
        return await Post.findAll({
        order: [[orderBy, sortOption]],
        });
        
    } 
    else if (sortOptionAndPageNumberIsSelected()==true) {
        return await Post.findAll({
        order: [[orderBy, sortOption]],

        offset: (pageNumber - 1) * pageFormula,
        limit: 5,
        });
    } 
    else if (sortOptionAndSearchIsSelected()==true) {
        return await Post.findAll({
        order: [[orderBy, sortOption]],

        where: {
            title: {
            [Op.substring]: searchPostTitle, //Search LIKE %PostTitle%
            },
        },
        });
    } 
    else if (sortOptionPageNumberAndSearchIsSelected()==true) {
        return await Post.findAll({
        order: [[orderBy, sortOption]],

        offset: (pageNumber - 1) * pageFormula,
        limit: 5,

        where: {
            title: {
            [Op.substring]: searchPostTitle, //Search LIKE %PostTitle%
            },
        },
        });
    }
    };

const getPostsbyWriter = async ({writerId}) => {
    return await Post.findAll({
            where: {
            userId: writerId,
            },
        });
    };

const getPostsByWriterWithFeatures = async ({
        writerId,
        searchPostTitle,
        sortOption,
        pageNumber,
        }) => {
        if (!sortOption) {
            //DEFAULT SORT
            orderBy = defaultOrderBy;
            sortOption = defaultSortOption;
        }

                function sortOptionIsSelected(){ 
                    if(writerId && sortOption && !pageNumber && !searchPostTitle){
                        return true;;
                    }
                return false;
                }
                function sortOptionAndPageNumberIsSelected(){
                    if(writerId && sortOption && pageNumber && !searchPostTitle){
                        return true;
                    }
                return false;
                }
                function sortOptionAndSearchIsSelected(){
                    if(writerId && sortOption && !pageNumber && searchPostTitle){
                        return true;
                    }
                return false;
                }
                function sortOptionPageNumberAndSearchIsSelected(){
                    if(writerId && sortOption && pageNumber && searchPostTitle){
                        return true;
                    }
                return false;
                }
    
            if (sortOptionIsSelected()==true) {
            return await Post.findAll({
                order: [[orderBy, sortOption]],
    
                where: {
                // [Op.or]:[  //KONDISI OR PADA DATABASE SESUAI KEINGINAN USER
    
                userId: writerId,
                },
            });
            } else if (sortOptionAndPageNumberIsSelected()==true) {
            return await Post.findAll({
                order: [[orderBy, sortOption]],
    
                offset: (pageNumber - 1) * pageFormula,
                limit: 5,
    
                where: {
                // [Op.or]:[  //KONDISI OR PADA DATABASE SESUAI KEINGINAN USER
    
                userId: writerId,
                },
            });
            } else if (sortOptionAndSearchIsSelected()==true) {
            return await Post.findAll({
                order: [[orderBy, sortOption]],
    
                where: {
                userId: writerId,
                title: {
                    [Op.substring]: searchPostTitle, //Search LIKE %PostTitle%
                },
                },
            });
            } else if (sortOptionPageNumberAndSearchIsSelected()==true) {
            return await Post.findAll({
                order: [[orderBy, sortOption]],
    
                offset: (pageNumber - 1) * pageFormula,
                limit: 5,
    
                where: {
                userId: writerId,
                title: {
                    [Op.substring]: searchPostTitle, //Search LIKE %PostTitle%
                },
                },
            });
            }
    }

    const getDetailPost = async (postId) => {
        return await Post.findOne({
            where: {
            id: postId,
            },
        });
        };

    const checkAuthId = async ({ postId, authUserId }) => {
    return await Post.findOne({
        where: {
        id: postId,
        userId: authUserId,
        },
    });
    };

    const editPost = async ({ title, image, body, authUserId, postId }) => {
    return await Post.update(
        {
        title: title,
        image: image,
        body: body,
        },
        {
        where: {
            id: postId,
            userId: authUserId,
        },
        }
    );
    };
    const checkWriterIdExist = async (writerId) => {
    return await Post.findOne({
        where: {
        userId: writerId,
        },
    });
    };

    const checkpostIdExists = async ({ postId }) => {
    return await Post.findOne({
        where: {
        id: postId,
        },
    });
    };
    const functionPostRepo = {
    createPost,
    getAllPost,
    getDetailPost,
    editPost,
    getPostsbyWriter,
    checkWriterIdExist,
    checkpostIdExists,
    getAllPostWithFeatures,
    checkAuthId,
    getPostsByWriterWithFeatures
    };

    module.exports = functionPostRepo;
