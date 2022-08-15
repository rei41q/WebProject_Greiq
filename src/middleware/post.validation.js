const { query, body } = require("express-validator");
const { param } = require('express-validator');

const getPostsValidation = [

    query("writerId").isNumeric().withMessage('Input Numbers').isLength({ min: 1}).optional({ nullable: true }),

    query("sortOption").isString().withMessage(' ASC/DESC ').
    isIn(['ASC', 'DESC']).withMessage('Input ASC or DESC').optional({ nullable: true }),
    
    query("pageNumber").isNumeric().withMessage('Input Numbers').isLength({ min: 1}).optional({ nullable: true }),
 
    query("searchPostTitle").isString().optional({ nullable: true }),
];
  
  const getOnePostValidation = [
    param("postId").isInt()
  ];
  
  const createPostsValidation = [

    body("title").isString().isLength({ min: 1 , max: 70}),

    body("image").isString().notEmpty(),

    body("body").isString().isLength({ min: 1 , max: 500})
];

  
module.exports = {
    getPostsValidation,
    getOnePostValidation,
    createPostsValidation
  };
  