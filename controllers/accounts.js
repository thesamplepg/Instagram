const Account = require('../models/Account');
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const { uploadImage, removeImage } = require('../utils/configs');
const Comment = require('../models/Comment');

module.exports.searchSimilarAccount = async(req, res) => {
    
    const regexp = new RegExp(req.query.userName.toLowerCase());

    const accounts = await Account.findSimilars(regexp);

    res.json({ accounts });

}

module.exports.getAccount = async(req, res) => {
    const userName = req.query.userName;

    try {
        const account = await Account.findOne({userName});

        if(account !== null) {

            delete account.password,
            delete account._id
            delete account.date

            res.json({success: true, account});
        } else {
            res.json({success: false});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.changeAvatar = (req, res) => {  
    
    if(req.session.token) 
    {

        jwt.verify(req.session.token, require('../keys').jwt, async(err, data) => {
            
            if(err) return console.log(err);

            const account = await Account.findOne({userName: data.userName});

            let resultData;

            if( account.avatarId !== 'default' ) {
                removeImage(account.avatarId);
            }

            uploadImage(req.file.path, {
                width: 320,
                height: 320,
                gravity: 'face',
                crop: 'thumb'
            })
                .then(async (result) => {
                    fs.removeSync(req.file.path);

                    await Comment.updateMany(
                        {creater: data.userName},
                        {$set: { avatar: result.secure_url }}
                    );

                    resultData = result;

                    return Account.findOneAndUpdate(
                        { userName: data.userName },
                        { $set: { 
                            avatar: result.secure_url,
                            avatarId: result.public_id
                         } }
                    );
                })
                .then((updated) => {
                    res.json({
                        success: true, 
                        avatar: resultData.secure_url, 
                        avatarId: resultData.public_id
                    });
                })
                .catch(err => console.log(err));

        });

    } else 
    {
        res.json({success: false, authroziation: false});
    }

}

module.exports.follow = (req, res) => {
    if(req.session.token) {
        
        jwt.verify(req.session.token, require('../keys').jwt, async(err, data) => {

            await Account.follow(data.userName, req.body.toFollow);

            res.json({success: true});

        });

    } else {
        res.json({success: false});
    }
}

module.exports.unfollow = (req, res) => {
    if(req.session.token) {
        
        jwt.verify(req.session.token, require('../keys').jwt, async(err, data) => {

            await Account.unfollow(data.userName, req.body.toUnfollow);

            res.json({success: true});

        });

    } else {
        res.json({success: false});
    }
}