# PortalGuessr Backend

This is the backend server for PortalGuessr, powered by Express, utilizing a RESTful API

## Installation

- Download the latest release if available.
- Create a `.env` file containing `MONGODB_DATABASE_URL` for your MongoDB URL, `SERVER_PORT`, and a random generated `API_KEY` for the basic auth.
- Run `npm install` to install the required dependencies.
- Run `npm start` to start the server or `npm run dev` with Nodemon.

## Installation using docker

- Download latest docker
- Create a `.env` file containing `MONGODB_DATABASE_URL` for your MongoDB URL and a random generated `API_KEY` for the basic auth.
- Run `docker build -t xnonxte/portalguessr-backend .` to build the container image. Keep in mind that the .env you created earlier is baked into the image!

- To start the container run `docker run -d xnonxte/portalguessr-backend`

## Trello Workspace

The official trello workspace for this project [here](https://trello.com/b/NgVubCDX/portalguessr-fullstack).

## Discord

Join the Discord server to get the latest news about PortalGuessr [here](https://discord.gg/dDbgtFb2KC).
