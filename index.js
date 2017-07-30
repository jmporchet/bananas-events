require('dotenv').config();

const Events = require('./controllers/events.controller');
const Koa = require('koa');
const logger = require('koa-logger');
const koaBody = require('koa-body');

const events = new Events();
const app = new Koa();
const router = require('koa-router')();

router.post('/', async (ctx, next) => {
  const result = await events.processMessage(ctx.request.body.text);
  console.log('this is what I got:', result);

  ctx.body = result;

  next();
});

app
  .use(logger())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(53142, () => {
  console.log('App started and listening on port 53142')
});
