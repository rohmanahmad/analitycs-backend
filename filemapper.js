'use strict'

const path = require('path')

const myBasePath = function (file = '') {
    return path.resolve(file)
}

module.exports = global.basePath = function (file = '') {
    return myBasePath(file)
}
require('dotenv').config({path: myBasePath('.env')})

const nameSpaces = {
    'Utils.Helper': './modules/globals/helpers/utils.helper',
    'Settings.Loader': './modules/globals/libs/settings.loader',
    'Layer1AuthToken.Middleware': './modules/globals/middlewares/Layer1AuthToken.middleware',
    'ValidateInput.Middleware': './modules/globals/middlewares/ValidateInput.middleware',
    'Http.Response': './modules/globals/listener/response',
    'All.Routes': './modules/globals/routes/all.routes',
    // MODELS
    'Logs.Model': './modules/globals/models/mongodb/logs.model',
    'Patterns.Model': './modules/globals/models/mongodb/patterns.model',
    'Users.Model': './modules/globals/models/mongodb/users.model',
    'Vocabularies.Model': './modules/globals/models/mongodb/vocabularies.model',
    'LoginLogs.Model': './modules/globals/models/mongodb/login_logs.model',
    'ShortLink.Model': './modules/globals/models/mongodb/short_link.model',
    'InvalidRequestLog.Model': './modules/globals/models/mongodb/invalid_request_log.model',
    // DEPENDENCIES
    '_': 'lodash',
    'BodyParser': 'body-parser',
    'Compression': 'compression',
    'Cors': 'cors',
    'debug': 'debug',
    'Express': 'express',
    'Http': 'http',
    'jwt': 'jsonwebtoken',
    'md5': 'md5',
    'mongod': 'mongodb',
    'moment': 'moment',
    'mongoose': 'mongoose',
    'optimist': 'optimist',
    'path': 'path',
    'util': 'util'
}

module.exports = global.use = function (name) {
    const moduleName = nameSpaces[name] || false
    if (moduleName) {
        return require(moduleName)
    } else {
        return require('./' + name)
    }
}

const mongod = require('mongodb')
const mongoose = require('mongoose')
const Env = process.env

const ObjectId = mongod.ObjectId
const mongooseObjID = mongoose.Schema.Types.ObjectId

const statics = {
    Env,
    mongooseObjID,
    ObjectId
}

module.exports = global.useStatic = function (name) {
    if (!statics[name]) {
        throw new Error(`${name} is not defined on static! please check.`)
    }
    return statics[name]
}
