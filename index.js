'use strict';
require('dotenv').config();
// require("isomorphic-fetch");

// const ngrokAuthToken = process.env.NGROK_AUTH_TOKEN;
// const slackOauthToken = process.env.SLACK_OAUTH_TOKEN;
// const postUrl = process.env.SLACK_POST_URL;
// const IncomingWebhook = require('@slack/client').IncomingWebhook;

const events = require('./controllers/events.controller');

const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const koaBody = require('koa-body');
const router = require('koa-router')();

router.post('/', (ctx, next) => {
  // receive information from Slack

  // parse the event
  events.processMessage(ctx.request.body.text);
  // store it in the database

  // confirm the operation to the user
  ctx.body = `Command received: ${ctx.request.body.text}`;

  next();
});

app
  .use(logger())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(53142);
