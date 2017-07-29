# Padel Slack bot

This Slack bot helps people organize events like padel games.

## Tech stack

Koa - listens to Slack requests and answers them

Sqlite - stores event details

Ngrok - exposes the server to the internet if you're behind a NAT

## Installing

Fork and clone the repo

Run ```npm install``` to install the dependencies

Download [ngrok](https://dashboard.ngrok.com/get-started) and follow the instructions to start it from the command line (```./ngrok http 53142```)

In the [Slack slash command settings](https://api.slack.com/apps/A6EMKTEAJ/slash-commands) create a /padel command if it doesn't exist yet



> **IMPORTANT**: Every time  you restart ```ngrok``` you'll have to update the [/padel command's](https://api.slack.com/apps/A6EMKTEAJ/slash-commands) ```Request URL``` and set it to what ```ngrok```'s ```Forwarding``` URL



Run ```npm start``` or ```npm run dev```

## Use

Type ```/padel create 13:00 tomorrow``` to create a new event

Type ```/padel list``` to get a list of scheduled events

Type ```/padel delete 21``` to delete a specific event

## Roadmap

- decouple the ngrok command line app from the bot and import it as a npm package

- use the EventBrite API to create/manage the events
