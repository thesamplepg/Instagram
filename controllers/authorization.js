const Account = require('../models/Account');
const ValidatorClass = require('../utils/validator');
const jwt = require('jsonwebtoken');
const crypt = require('bcryptjs');

module.exports.signup = async(req, res) => {

    const validationConfig = {
        fullName: 5,
        userName: 3,
        password: 6
    }

    const Validator = new ValidatorClass(validationConfig);

    if( Validator.validate(req.body) )
    {

        const account = await Account.findOne({userName: req.body.userName.toLowerCase()});

        if( !account ) 
        {
            
            const hashedPassword = crypt.hashSync(req.body.password, crypt.genSaltSync(10));
            req.body.password = hashedPassword;
            req.body.userName = req.body.userName.toLowerCase();

            const newAccount = new Account(req.body);

            newAccount.save()
                .then(result => {

                    res.json({ success: true });

                })
                .catch(err => {
                    console.log(err);

                    res.json({sucess: false, message: 'Error'});
                });

        } else 
        {
            res.json({success: false, message: 'User with same username already exists'});
        }


    } else 
    {
        res.json({success: false, message: 'Invalid data'});
    }

}

module.exports.login = async(req, res) => {

    const validationConfig = {
        userName: 3,
        password: 6
    }
    
    const Validator = new ValidatorClass(validationConfig);
    
    if(Validator.validate(req.body)) 
    {

        const account = await Account.findOne({userName: req.body.userName.toLowerCase()});

        if( account ) {

            if(crypt.compareSync(req.body.password, account.password)) 
            {

                const jwtData = {
                    userName: account.userName
                }
    
                req.session.token = jwt.sign(jwtData, require('../keys').jwt);
    
                res.json({success: true});

            } else 
            {
                res.json({success: false, message: 'Invalid Password'});
            }

        } else {
            res.json({success: false, message: 'Account does not exists'});
        }

    }
    else {
        res.json({success: false, message: 'Invalid Data'});
    }
}

module.exports.authorization = async(req, res) => {

    if(req.session.token) {

        jwt.verify(req.session.token, require('../keys').jwt, (err, data) => {

            if(err) return res.json({ success: false });

            res.json({ success: true, userName: data.userName });

        });

    } else 
    {

        res.json({success: false});

    }

}

