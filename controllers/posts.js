const Account = require('../models/Account');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const { uploadImage, removeImage, decodeJwt } = require('../utils/configs');
const { ObjectId } = require('mongodb');

module.exports.getPosts = (req, res) => {
    
    const { userName, s, l } = req.query;

    Post.find({ filter: { creater: userName }, skip: Number(s), limit: Number(l) })
        .then( posts => {
            res.json({ posts });
        })
        .catch(err => console.log(err));

}

module.exports.getOnePost = (req, res) => {

    Post.findOne({ _id: ObjectId(req.query.id) })
        .then(post => res.json({ post }))
        .catch(err => console.log(err));

}

module.exports.createPost = async(req, res) => {

    if(req.session.token) {

        const data = await decodeJwt(req.session.token);

        uploadImage(req.file.path)
            .then(result => {
        
                    
                fs.removeSync(req.file.path);
                const postInfo = {
                    image: result.secure_url,
                    imageId: result.public_id,
                    creater: data.userName
                }
                const newPost = new Post(postInfo);
                return newPost.save();
                    
            })
            .then(post => {
                res.json({ success: true, post });
            })
            .catch(err => {
                console.log(err);
                res.json({success: false});
            });

    } else {
        res.json({authorization: false});
        fs.removeSync(req.file.path);
    }
} 

module.exports.deletePost = async(req, res) => {
    if(req.session.token) {
        
        const data = await decodeJwt(req.session.token);
        
        const post = await Post.findOne({_id: ObjectId(req.body.postId)});

        await removeImage(post.imageId);

        const result = await Post.delete(data.userName, req.body.postId);

        res.json(result);
        
    } else {
        res.json({ authorization: false });
    }
}

module.exports.like = async(req, res) => {
    if(req.session.token) {
        const data = await decodeJwt(req.session.token);
        const result = await Post.like(req.body.postId, data.userName);
        res.json(result);
    } else res.json({ authorization: false });
}

module.exports.unlike = async(req, res) => {
    if(req.session.token) {
        const data = await decodeJwt(req.session.token);
        const result = await Post.unlike(req.body.postId, data.userName);
        res.json(result);
    } else res.json({ authorization: false });
}

module.exports.addComment = async(req, res) => {
    if(req.session.token) {
        
        const data = await decodeJwt(req.session.token);
        
        const newComment = await Post.addComment(req.body);

        res.json(newComment);
        
    } else {
        res.json({ authorization: false });
    }
}

module.exports.deleteComment = async(req, res) => {
    if(req.session.token) {

        const data = await decodeJwt(req.session.token);

        const deletedComment = await Post.deleteComment(req.body.commentId);

        res.json(deletedComment);

    } else {
        res.json({ authorization: false });
    }
}