    const { Post } = require("../database/models");
    const { Op, where } = require("sequelize");
    const e = require("express");

    //#-------------Default Value-----------------------#//

    //-------------For get posts by Writer-----------------//

    let defaultOrderByForWriter= "id";
    let defaultSortOptionrForWriter = "ASC";

    let pageFormulaForWriter = 5 + 1 - 1; 
    let limitValueForWriter = 5;

    //---------- ---For get all post-----------------------//

    let defaultOrderByForAllPost= "id";
    let defaultSortOptionForAllPost = "ASC";

    let pageFormulaForAllPost = 5 + 1 - 1;
    let limitValueForAllPost = 5;

    // ( ditaru pada variable global dan dipisah
    //   agar suatu saat mudah maintenance/update sesuai permintaan ))

    //#---------------------------------------------------#//

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

    let orderBy= "title"

    if (!sortOption) {
        //DEFAULT SORT
        orderBy = defaultOrderByForAllPost;
        sortOption = defaultSortOptionForAllPost;
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

        offset: (pageNumber - 1) * pageFormulaForAllPost,
        limit: limitValueForAllPost,
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

        offset: (pageNumber - 1) * pageFormulaForAllPost,
        limit: limitValueForAllPost,

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

        let orderBy= "title"

        if (!sortOption) {
            //DEFAULT SORT
            orderBy = defaultOrderByForWriter;
            sortOption = defaultSortOptionrForWriter;
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
    
                offset: (pageNumber - 1) * pageFormulaForWriter,
                limit: limitValueForWriter,
    
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
    
                offset: (pageNumber - 1) * pageFormulaForWriter,
                limit: limitValueForWriter,
    
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
    const checkWriterIdExists = async (writerId) => {
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
    checkWriterIdExists,
    checkpostIdExists,
    getAllPostWithFeatures,
    checkAuthId,
    getPostsByWriterWithFeatures
    };

    module.exports = functionPostRepo;
