const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/posts');
const { upload } = require('../utils/configs');



// /api/posts => GET
router.get('/', postsControllers.getPosts);
// /api/posts/post => GET
router.get('/post', postsControllers.getOnePost);
// /api/posts/new => POST
router.post('/new', upload.single('image'), postsControllers.createPost);
// /api/posts/delete => DELETE
router.delete('/delete', postsControllers.deletePost);
// /api/posts/like => PUT
router.put('/like', postsControllers.like);
// /api/posts/unlike => Put
router.put('/unlike', postsControllers.unlike);
// /api/posts/comments => GET
router.get('/comments', postsControllers.getComments);
// /api/posts/comment => POST
router.post('/comment', postsControllers.addComment);
// /api/posts/comment/like => PUT
router.put('/comment/like', postsControllers.likeComment);
// /api/posts/comment/unlike => PUT
router.put('/comment/unlike', postsControllers.unlikeComment);


module.exports = router;