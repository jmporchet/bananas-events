# Padel Slack bot

This Slack bot helps people organize various events like padel games.

## Tech stack

BotKit - listens to Slack requests and answers them

Sqlite - stores event details

Localtunnel - exposes the server to the internet if you're behind a NAT

## Installing

Fork and clone the repo

Run `npm install` to install the dependencies

Download localtunnel `npm install -g localtunnel`  and execute it like this `lt --port 8765 --subdomain cwbcn `

In the [Slack slash command settings](https://api.slack.com/apps/A6EMKTEAJ/slash-commands) create a /padel command if it doesn't exist yet



> **IMPORTANT**: Every time  you restart ```ngrok``` you'll have to update the [/padel command's](https://api.slack.com/apps/A6EMKTEAJ/slash-commands) ```Request URL``` and set it to the `url`  value displayed by `localtunnel`.



Go to the [Slack admin panel's App  Credentials](https://api.slack.com/apps/A6EMKTEAJ/general) and use the information to start the application like this : `CLIENT_ID=<client id> CLIENT_SECRET=<client secret> VERIFICATION_TOKEN=<verification token> PORT=8765 npm run dev`

## Use

Type ```/padel create 13:00 tomorrow``` to create a new event

Type ```/padel next``` to see the next event

Type ```/padel list``` to get a list of scheduled events

Type ```/padel delete 21``` to delete a specific event

## Roadmap

- decouple the localtunnel command line app from the bot and import it as a npm package

- add the events to people's Google/Outlook calendars



Made with love in [Codeworks](http://www.codeworks.me)