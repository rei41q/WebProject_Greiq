const postService = require("./post.service");
const error500 = "Something went wrong. Please try again later";
const error406 = "Post Not Found";
const error412 = "Writer ID doesn't exist";
const error401 = "Authorization failed" 
const updatesuccess = "Update successful"
const emptyResult = ""
const errorMessage = {
  error500,
  error406,
  error412,
  error401,
};

const createPost = async (req, res) => {
  try {
    const { title, image, body } = req.body;
    const  authUser  = req.auth;

    const  authUserId = authUser.id;
    
    const createPost = await postService.createPost({
      title,
      image,
      body,
      authUserId,
    });

    return res.status(200).json(createPost);

  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
};


const getAllPostOrByWriter = async (req, res) => {

  // #------- Refactor agar mudah maintenance -----------#

  // 1. Membuat 2 function untuk get all post dan by writer (Agar mudah pengecekan / menambah fitur)
      
    // - fitur memiliki functionnya sendiri
    // (getAllPostWithFeatures & getPostsByWriterWithFeatures ) // update lebih mudah jika salah satu ingin nambah fitur
    
    // - tanpa fitur memiliki functionnya  sendiri
    // (getAllPost & getPostsbyWriter)

  //---------------------------------------------------//

  // 2. Memindahkan variable default orderBy & default SortOption ke dalam variable global (repository)
        //(Agar mudah di update jika kedepannya ada perubahan struktur)

  // 3. Memindahkan kondisi fitur yg telah dipilih user menjadi satu function (chooseFeatures)

  // #---------------------------------------------------#
  try {
    
    const { writerId, sortOption, searchPostTitle, pageNumber } = req.query;
     
    //User bisa memilih fitur sesuai keinginan

    //-----------------------------------------------------------//
            function chooseFeatures() //Check fitur yg dipilih user, dijadikan function agar mudah dicek/maintance/nambah fitur
            {   
              if(sortOption || searchPostTitle|| pageNumber){
                  return true;
                }
              return false;
            }
    //-----------------------------------------------------------//
  
    if (writerId) {  //CEK PARAMETER WriterId ADA/NULL

      const checkWriterIdExist= await postService.checkWriterIdExist(writerId);  //CEK WriterId ADA/NULL DALAM DATABASE

      if (checkWriterIdExist) {

         //WriterId MEMILIKI 3 FITUR
        
          if(chooseFeatures() == true ){ //Cek fitur yg dipilih user

          const getPostsByWriterWithFeatures = await postService.getPostsByWriterWithFeatures({
          writerId,
          searchPostTitle,
          sortOption,
          pageNumber,
        });

              if(getPostsByWriterWithFeatures!=emptyResult){  //JIKA HASIL FITUR ADA OLEH ID PENULIS INI, MAKA AKAN MENGEMBALIKAN DATA TERSEBUT  
              return res.status(200).json(getPostsByWriterWithFeatures);   
              }

              else{ 
              return res.status(406).json({ message: errorMessage.error406 }); //JIKA TIDAK ADA, MAKA AKAN MENGEMBALIKAN STATUS 406 (POST NOT FOUND) 
              }

        }
        else{ //TANPA FITUR (FUNCTION SENDIRI)
            const resultPostsbyWriter = await postService.getPostsbyWriter({writerId});

              if(resultPostsbyWriter!=emptyResult){ //JIKA HASIL FITUR ADA OLEH ID PENULIS INI, MAKA AKAN MENGEMBALIKAN DATA TERSEBUT
                
              return res.status(200).json(resultPostsbyWriter); 
              } 
              else { 
              return res.status(406).json({ message: errorMessage.error406 }); //JIKA DATA KOSONG, MAKA AKAN MENGEMBALIKAN STATUS 406 (POST NOT FOUND) 
              }
            }
      }  
      else {
          return res.status(412).json({ message: errorMessage.error412 });  //JIKA TIDAK ADA ID PENULIS INI, RETURN Writer ID doesn't exist
          }
      } 
  
    //-----------------------------------------------------------//
    // GET ALL POST

      else {  //JIKA USER TIDAK MEMILIH WRITER ID, MAKA AKAN MASUK PADA GET ALL POST
       
        //GET ALL POST MEMILIK 3 FITUR

          if(chooseFeatures() == true){ //Cek fitur yg dipilih user
          const getAllPostWithFeatures = await postService.getAllPostWithFeatures({
          searchPostTitle,
          sortOption,
          pageNumber
          });
                if (getAllPostWithFeatures !=emptyResult) { //JIKA POST ADA, MAKA AKAN MENGEMBALIKAN DATA PADA POST
                return res.status(200).json(getAllPostWithFeatures);
                } 
                else { //JIKA POST TIDAK ADA, MAKA AKAN MENGEMBALIKAN POST NOT FOUND
                return res.status(406).json({ message: errorMessage.error406 });
                }
          }
          else{  //TANPA FITUR (FUNCTION SENDIRI)

              // JIKA USER TIDAK MEMILIH FITUR, MAKA AKAN GET ALL POST
              
              const getAllPost = await postService.getAllPost(); 

                if (getAllPost !=emptyResult) {  //JIKA POST ADA, MAKA AKAN MENGEMBALIKAN DATA PADA POST
                return res.status(200).json(getAllPost);
                } 

                else {  //JIKA POST TIDAK ADA, MAKA AKAN MENGEMBALIKAN POST NOT FOUND     
                return res.status(406).json({ message: errorMessage.error406 });
                }
              }
        }
      }
    catch (error) { //JIKA TERDAPAT KESALAHAN PADA SERVER, STATUS (500)
      return res.status(500).json({ message: errorMessage.error500 });
    }
};

const getDetailPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const resultDetailPost = await postService.getDetailPost(postId);

    if (resultDetailPost) {
      return res.status(200).json(resultDetailPost);
    }

    else return res.status(406).json(errorMessage.error406);

  } catch (error) {
    return res.status(500).json({ message: errorMessage.error500 });
  }
};

const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const { title, image, body } = req.body;
    
    const  authUser  = req.auth;

    const  authUserId = authUser.id;

    const checkpostIdExists = await postService.checkpostIdExists({postId}); //CHECK POST YANG MAU DIPILIH ADA/NOT

    const checkAuthId = await postService.checkAuthId( //CHECK AUTH UNTUK VERIFIKASI DATA JIKA POST INI MILIK USER INI
        {   
            postId, 
            authUserId
        });

    if (checkpostIdExists && checkAuthId) {

      const resultEditPost = await postService.editPost({
      title,
      image,
      body,
      authUserId,
      postId,
      });
    
      if(resultEditPost)
      return res.status(200).send({ message: updatesuccess });
        
      else 
      return res.status(406).send({ message: errorMessage.error406 });

      }
  
    else if(!checkAuthId){ // JIKA AUTH TIDAK SESUAI, ERROR 401 (Authorization failed)
    return res.status(401).send({ message: errorMessage.error401 });
    }

  } catch (error) {
    return res.status(500).send({ message: errorMessage.error500 });
  }
};

const functionPost = {
  createPost,
  getAllPostOrByWriter,
  editPost,
  getDetailPost,
};

module.exports = functionPost;