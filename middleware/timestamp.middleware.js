var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
//var path = require('path')

var timeLogger = express()

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream("./logs.txt", { flags: 'a' })

// setup the logger
timeLogger.use(morgan('IP Adress-:remote-addr, Method::method, URL::url, TimeStamp::date[web]', { stream: accessLogStream }))


module.exports = {
    timeLogger
}

