const { getCollection } = require('../utils/database');
const { ObjectId } = require('mongodb');
const Comment = require('./Comment');
const Account = require('./Account');

class Post {
    constructor (data) {
        this.image = data.image;
        this.creater = data.creater;
        this.comments = [];
        this.likes = [];
        this.date = Date.now();
        this.imageId = data.imageId;
        this.avatar = data.avatar
    }    

    save() {
        const posts = getCollection('posts');
        let newPost;

        return posts.insertOne(this)
            .then(res => {
                newPost = res.ops[0];
                return Account.findOneAndUpdate({userName: this.creater}, {$push: { posts: res.ops[0]._id }});
            })
            .then(res => Promise.resolve(newPost))
            .catch(err => Promise.resolve(err));
    }

    static async find(query) {
        const posts = getCollection('posts');

        const fetchedPosts = await posts.find(query.filter)
            .skip(query.skip || 0)
            .sort({date: -1})
            .limit(query.limit || 1000)
            .toArray();

        return Promise.resolve(fetchedPosts);
    }

    static findOne(filter) {
        const posts = getCollection('posts');

        return posts.findOne(filter)
            .then(post => Promise.resolve(post))
            .catch(err => {
                console.log(err);
                Promise.reject(err)
            });
    }

    static updateMany(filter, updateQuery) {
        const posts = getCollection('posts');

        return posts.updateMany(filter, updateQuery)
            .then(res => {
                return Promise.resolve({success: true});
            })
            .catch(err => {
                console.log(err);
                return Promise.reject({success: false});
            })

    }

    static like (id, liker) {
        const posts = getCollection('posts');

        return posts.updateOne({_id: ObjectId(id)}, {$push: { likes: liker }})
            .then(res => Promise.resolve({ success: true }))
            .catch(err => {
                console.log(err);
                Promise.resolve({success: false});
            });
    }

    static unlike (id, unliker) {
        const posts = getCollection('posts');

        return posts.updateOne({_id: ObjectId(id)}, {$pull: { likes: unliker }})
            .then(res => Promise.resolve({ success: true }))
            .catch(err => {
                console.log(err);
                Promise.resolve({success: false});
            })
    }

    static delete (account, postId) {
        const posts = getCollection('posts');

        return posts.deleteOne({_id: ObjectId(postId)})
            .then(res => {
                return Account.findOneAndUpdate(
                    { userName: account }, 
                    { $pull: { posts: ObjectId(postId) }}
                )
            })
            .then(updated => {
                return Promise.resolve({ success: true });
            })
            .catch(err => {
                console.log(err);
                return Promise.resolve({ success: false });
            });
    }   

    static async addComment (comment) {
        const posts = getCollection('posts');

        const newComment = await new Comment(comment).save();

        return posts.updateOne(
            {_id: ObjectId(newComment.ops[0].post)}, 
            {$push: { comments:newComment.ops[0]._id }}
        )
            .then(res => Promise.resolve({ success: true, comment: newComment.ops[0] }))
            .catch(err => {
                console.log(err);
                return Promise.resolve({success: false});
            })
    }

    static async deleteComment (commentId) {
        const posts = getCollection('posts');

        const deletedComment = await Comment.delete(commentId);

        return posts.updateOne({_id: ObjectId(deletedComment.post)}, {$pull: { comments: deletedComment._id }})
            .then(res => {
                return Promise.resolve({ success: true });
            })
            .catch(err => {
                console.log(err);
                return Promise.resolve({success: false});
            })
    }
}

module.exports = Post;