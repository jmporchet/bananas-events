const Botkit = require('botkit');
const Strings = require('./utils/strings');
const Console = console;

const EventsController = require('./controllers/events.controller');

if (
  !process.env.CLIENT_ID ||
  !process.env.CLIENT_SECRET ||
  !process.env.PORT ||
  !process.env.VERIFICATION_TOKEN
) {
  Console.log(
    'Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment'
  );
  process.exit(1);
}

let config = {
  json_file_store: './db_slackbutton_slash_command/',
};

const controller = Botkit.slackbot(config).configureSlackApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scopes: ['commands']
});

controller.setupWebserver(process.env.PORT, function (err, webserver) {
  controller.createWebhookEndpoints(controller.webserver);

  controller.createOauthEndpoints(controller.webserver, function (
    err,
    req,
    res
  ) {
    if (err) {
      res.status(500).send('ERROR: ' + err);
    } else {
      res.send('Success!');
    }
  });
});

/** ANSWERS SLASH COMMANDS **/
controller.on('slash_command', async function (slashCommand, message) {
  switch (message.command) {
    case '/padel': //handle the `/echo` slash command. We might have others assigned to this app too!
      // but first, let's make sure the token matches!
      if (message.token !== process.env.VERIFICATION_TOKEN) return; //just ignore it.

      // if no text was supplied, treat it as a help command
      if (message.text === '' || message.text === 'help') {
        slashCommand.replyPrivate(message, Strings.HELP);
        return;
      }

      const events = new EventsController();
      const result = await events.processMessage(message.text);

      slashCommand.replyPublic(message, result); // display a creation message
      // get list of users

      // loop through each user and send them a private message to register

      return;

    default:
      slashCommand.replyPublic(
        message,
        'I\'m afraid I don\'t know how to ' + message.command + ' yet.'
      );
  }
});


/** ANSWERS BUTTON CLICKS **/
controller.on('interactive_message_callback', function (bot, trigger) {

  switch (trigger.actions[0].name) {
    case 'register':
      // console.log(trigger);
      bot.replyPrivateDelayed(trigger, {
        'replace_original': true,
        'text' : 'event info'
      });
      break;
  }
});
