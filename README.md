# Padel Slack bot

This Slack bot helps people organize events like padel games.

## Tech stack

Koa - listens to Slack POST requests and answers them

Sqlite - stores event details

Ngrok - exposes the server to the internet if you're behind a NAT

## Installing

Fork and clone the repo

Run ```npm install``` to install the dependencies

Download [ngrok](https://dashboard.ngrok.com/get-started) and follow the instructions to start it from the command line

Set the redirect URL in the [Slack api settings](https://api.slack.com/apps/A6EMKTEAJ/oauth) according to the ngrok output

Add the SLACK_POST_URL constant in ./.env and set it to the [Webhook URL for your team](https://api.slack.com/apps/A6EMKTEAJ/incoming-webhooks)

Run ```npm start``` or ```npm run dev```

## Use

Type ```/padel create 13:00 tomorrow``` to create a new event
Type ```/padel list``` to get a list of scheduled events
Type ```/padel delete 21``` to delete a specific event
