const { getDatabase } = require('../utils/database');
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
        const comments = getDatabase('instagram').collection('comments');

        return comments.insertOne(this)
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err));
    }

    static delete (id) {
        const comments = getDatabase('instagram').collection('comments');

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