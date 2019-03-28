export const logger = store => next => action => {
    if(typeof action === 'function') {
        console.log('--[ THUNK ]--');
    } else {
        console.log('--[ DISPATCH ]--');
        console.log(action);
    }
    next(action)
}