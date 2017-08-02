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
  scopes: ['commands', 'channels:read']
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

      return;

    default:
      slashCommand.replyPublic(
        message,
        message.command + ' has not been implemented yet.'
      );
  }
});


/** ANSWERS BUTTON CLICKS **/
controller.on('interactive_message_callback', function (bot, trigger) {

  switch (trigger.actions[0].name) {
    case 'register':
      // This will need to be refactored and go into the controller and serializer
      if (trigger.original_message.attachments.length < 2) {
        // We need to store the participants in a column in the events table as a JSON object
        trigger.original_message.attachments.push({
          'title': 'People attending (1)',
          'text': '<@' + trigger.user + '>'
        });
      } else if (trigger.original_message.attachments[1].text.indexOf(trigger.user) === -1) {
        trigger.original_message.attachments[1].title = 'Interested people (' + Number(trigger.original_message.attachments[1].text.match(/@/g).length+1) + ')';
        trigger.original_message.attachments[1].text = trigger.original_message.attachments[1].text + ' <@' + trigger.user + '>';
      }

      bot.replyInteractive(trigger, trigger.original_message);
      break;
  }
});
