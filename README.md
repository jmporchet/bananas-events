# Bananas Events Slack bot

Keeping track of attendance when organizing informal events in a company is often a pain point.
Bananas Events is a Slack bot that aims to simplify this process, by harnessing the power of Slack as an Operating System for companies.

![screenshot](https://media.giphy.com/media/12r1EByyzocQow/giphy.gif "Bananas Events animated gif")

## Usage

- Type ```/event create Drinks after work @7pm at Hoppiness``` to create a new event

- Type ```/event next``` to see the next event

## Tech stack

[Koa](https://github.com/koajs) - listens to [Slack](https://api.slack.com) requests

[BotKit](https://github.com/howdyai/botkit) - interprets the requests and responds to them

[Sqlite](https://github.com/sequelize/sequelize) - stores event details locally

[Postgresql](https://www.postgresql.org/) - used when deploying to [Heroku](https://dashboard.heroku.com/)

[Localtunnel](https://github.com/localtunnel/localtunnel) - exposes the server to the internet if you're running the bot behind a NAT

## Deployment

### Installing

Fork and clone the repo

Run `npm install` to install the dependencies

Download localtunnel `npm install -g localtunnel` and execute it like this `lt --port 8765 --subdomain <yourdomain> `. Be aware that it can be unreliable, needing to be restarted frequently.

If your database is empty, you'll need to add the following line to the models/event.js file:
`Event.sync({force: true})` ([discussion](https://stackoverflow.com/a/39689092/925517)).
Remove that line once you've run the code one time.

Authenticate the application with Oauth by going to (http://localhost:8765/login)

### Slack configuration

Go to the [Slack admin panel's App  Credentials](https://api.slack.com/apps/) and create a new application

In the Interactive Messages, enable them and set the Request URL to `<your server>/slack/receive`.

In the Slash Commands, create a new command called `/event`, and set the Request URL to `<your server>/slack/receive`.

On the general tab use the information to start the application like this : `CLIENT_ID=<client id> CLIENT_SECRET=<client secret> VERIFICATION_TOKEN=<verification token> PORT=8765 npm run dev`

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
