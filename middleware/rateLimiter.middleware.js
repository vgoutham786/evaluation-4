const rateLimit = require('express-rate-limit');


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: async (request, response) => {

        return {msg:'You can only make 5 requests every minute.'}
    },
})

// Apply the rate limiting middleware to all requests
module.exports = {
    limiter
}