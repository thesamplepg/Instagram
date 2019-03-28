const Account = require('../../models/Account');
const { connectDB } = require('../../utils/database');

function createNewUser () {
    const data = {
        userName: 'Super',
        fullName: 'Kambi Boy',
        password: '2392343#23'
    }
    
    const newAccount = new Account(data);
    
    return newAccount.save()
        .then(res => {
            return Promise.resolve(true);
        })
        .catch(err => {
            return Promise.reject(false);
        });
}

async function findSimilars (regex) {
    return Account.findSimilars(regex);
}

async function follow () {
    return Account.follow('aktan', 'adilet40');
}

async function unfollow () {
    return Account.unfollow('aktan', 'adilet40');
}

let regexp = new RegExp('p');

connectDB( async() => {

    console.log('-------------------');
    console.log('-------------------');
    console.log('-------------------');


    // console.log('create new account ---', await createNewUser());
    // console.log('find similar accounts ---', (await findSimilars(regexp)).length);
    // console.log('follow', await follow());
    console.log('unfollow', await unfollow());

    console.log('-------------------');
    console.log('-------------------');
    console.log('-------------------');
});
