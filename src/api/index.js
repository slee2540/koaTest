const Router = require('koa-router');

const api = new Router();

const auth = require('./auth');
api.use('/auth', auth.routes());

// const books = require('./books');
// api.use('/books', books.routes());

module.exports = api;