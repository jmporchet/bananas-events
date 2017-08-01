require('dotenv').config();

const Events = require('./controllers/events.controller');
const Koa = require('koa');
const logger = require('koa-logger');
const koaBody = require('koa-body');

const events = new Events();
const app = new Koa();
const router = require('koa-router')();

router.post('/', (ctx, next) => {
  const result = events.processMessage(ctx.request.body.text);
  // store it in the database
  // confirm the operation to the user
  ctx.body = `Command received: ${ctx.request.body.text}, response ${JSON.stringify(result)}`;

  next();
});

app
  .use(logger())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(53142);
