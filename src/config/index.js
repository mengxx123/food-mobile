let apiDomain
if (process.env.NODE_ENV === 'production') {
    // apiDomain = 'http://120.78.177.9:1026'
    apiDomain = 'https://api.yunser.com'
} else {
    apiDomain = 'http://localhost:1026'
    // apiDomain = 'http://localhost:8080'
}

module.exports = {
    apiDomain
}
