# Padel Slack bot

This Slack bot helps people organize various events like padel games.

## Tech stack

BotKit - listens to Slack requests and answers them

Sqlite - stores event details

Localtunnel - exposes the server to the internet if you're behind a NAT

## Installing

Fork and clone the repo

Run `npm install` to install the dependencies

Download localtunnel `npm install -g localtunnel` and execute it like this `lt --port 8765 --subdomain cwbcn `. Be aware that it can be unreliable, needing to be restarted frequently.

In the [Slack slash command settings](https://api.slack.com/apps/A6EMKTEAJ/slash-commands) create a /padel command if it doesn't exist yet

Go to the [Slack admin panel's App  Credentials](https://api.slack.com/apps/A6EMKTEAJ/general) and use the information to start the application like this : `CLIENT_ID=<client id> CLIENT_SECRET=<client secret> VERIFICATION_TOKEN=<verification token> PORT=8765 npm run dev`

Authenticate the application with Oauth by going to (http://localhost:8765/login)

## Use

Type ```/padel create 13:00 tomorrow``` to create a new event

Type ```/padel next``` to see the next event

## Contributing

- fix the tests by mocking the database data

- replace the file store database on which this BotKit implementation relies by a table in the app's SQlite database.

- implement a database persistance for the attendance tracking

- add button to unregister from an event

- list upcoming events and sort them by date, with their corresponding attendance

- add configurable event reminders

- add the events to people's Google/Outlook calendars once they register

- manage payments among participants (enter total amount, split by number of participants, send paypal link as DM)

- decouple the localtunnel command line app from the bot on development


Made with love in [Codeworks](http://www.codeworks.me)
