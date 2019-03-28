module.exports.isAuthorizied = (data) => {
    return !data.authorizationLoading && data.authorization
}