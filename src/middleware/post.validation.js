const { request } = require("express");
const { query } = require("express-validator");
const { param } = require('express-validator');

const getPostsValidation = [

    query("writerId").isNumeric().isLength({ min: 1}).withMessage('Input Numbers').optional({ nullable: true }),

    query("sortOption").isString().withMessage(' ASC/DESC ').
    isIn(['ASC', 'DESC']).withMessage('Input ASC or DESC').optional({ nullable: true }),
    
    query("pageNumber").isNumeric().isLength({ min: 1}).optional({ nullable: true }),
 
    query("searchPostTitle").isString().optional({ nullable: true }),
];
  
  const getOnePostValidation = [
    param("postId").isInt()
  ];
  

  
module.exports = {
    getPostsValidation,
    getOnePostValidation
  };
  