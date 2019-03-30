const { getCollection } = require('../utils/database');
const { ObjectId } = require('mongodb');

class Comment {
    constructor (data) {
        this.text = data.text;
        this.post = data.post;
        this.date = Date.now();
        this.likes = [];
        this.creater = data.creater;
        this.avatar = data.avatar
    }    

    save() {
        const comments = getCollection('comments');

        return comments.insertOne(this)
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }

    static find (query, page) {
        const comments = getCollection('comments');


        return comments.find(query)
            .skip(page * 12).limit(12).toArray()
            .then(comments => {
                return Promise.resolve(comments);
            })
            .catch(err => {
                console.log(err);
                return Promise.reject({success: false});
            });
    }

    static updateMany(filter, updateQuery) {
        const comments = getCollection('comments');

        return comments.updateMany(filter, updateQuery)
            .then(res => {
                return Promise.resolve({success: true});
            })
            .catch(err => {
                console.log(err);
                return Promise.reject({success: false});
            })

    }

    static delete (id) {
        const comments = getCollection('comments');

        let deletedComment;

        return comments.findOne({_id: ObjectId(id)})
            .then(comment => {
                deletedComment = comment;
                return comments.deleteOne({_id: comment._id});
            })
            .then(res => deletedComment)
            .catch(err => {
                console.log(err);
                return Promise.resolve(err);
            });
    }

    
}

module.exports = Comment;