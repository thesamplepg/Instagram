const { getCollection } = require('../utils/database');

class Account {
    constructor (data) {
        this.userName = data.userName
        this.password = data.password
        this.fullName = data.fullName
        this.avatar = 'https://im0-tub-com.yandex.net/i?id=7325a04abfce3925daf2a58432c64277&n=13',
        this.followers = []
        this.follows = []
        this.saved = []
        this.about = ''
        this.posts = [],
        this.website = ''
        this.date = Date.now()
        this.avatarId = 'default'
    }


    save() {

        return getCollection('accounts').insertOne(this)
            .then(result => {
                return Promise.resolve(result);
            })
            .catch(err => {
                console.log(err);
                return Promise.reject(err);
            });
    }

    static findOne(filter) {
        return getCollection('accounts')
            .findOne(filter)
            .then(res => Promise.resolve(res))
            .catch(err => {
                Promise.reject(err);
                console.log(err)
            });
    }

    static async findSimilars(exp) {
        return getDatabase('instagram').collection('accounts')
            .find({userName: {$regex: exp}})
                .project({userName: 1, fullName: 1, avatar: 1, _id: 0})
                .toArray()
                .then(res => {
                    return Promise.resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    return Promise.resolve(null)
                });
    }

    static async findOneAndUpdate(filter, updateQuery) {
        try {
            const updated = getCollection('accounts')
                .updateOne(filter, updateQuery);

            return Promise.resolve(updated)

        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async follow(follower, followingAccount) {
        const accounts = getCollection('accounts');

        try {
            await accounts.updateOne(
                {userName: follower}, 
                {$push: {follows: followingAccount}}
            );
            await accounts.updateOne(
                {userName: followingAccount}, 
                {$push: {followers: follower}}
            );

            return Promise.resolve({success: true});
        } catch (error) {
            console.log(error);

            return Promise.reject({success: false});
        }
    }

    static async unfollow(unfollower, unfollowingAccount) {
        const accounts = getCollection('accounts');

        try {
            await accounts.updateOne(
                {userName: unfollower}, 
                {$pull: {follows: unfollowingAccount}}
            );
            await accounts.updateOne(
                {userName: unfollowingAccount}, 
                {$pull: {followers: unfollower}}
            );

            return Promise.resolve({success: true});
        } catch (error) {
            console.log(error);

            return Promise.reject({success: false});
        }
    }
}

module.exports = Account;