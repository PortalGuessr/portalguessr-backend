# PortalGuessr Backend

This is the backend server for PortalGuessr, powered by Express, utilizing a RESTful API.

## Usage

These are all the server routes and their purposes as of 27/10/2023.

1. **Get all chambers:**

   - `GET /chambers`
   - Retrieve a list of all chambers.

2. **Get a specific chamber:**

   - `GET /chambers/<id>`
   - Retrieve a specific chamber by its unique ID.

3. **Get random chambers by amount:**

   - `GET /chambers/random/<amount>`
   - Retrieve a random selection of chambers based on the specified amount.

4. **Get random chambers by amount and difficulty:**

   - `GET /chambers/random/<amount>/<difficulty>`
   - Retrieve a random selection of chambers based on the specified amount and difficulty level.

5. **Post a new chamber:**

   - `POST /chambers/new`
   - Create a new chamber by providing the necessary information in the request body.

6. **Delete a chamber:**

   - `DELETE /chambers/<id>`
   - Delete a specific chamber by its unique ID.

7. **Edit an image for a chamber:**
   - `PATCH /chambers/<id>`
   - Update the information and attributes of a specific chamber identified by its unique ID.

## Installation

- Download the latest release if available.
- Create a `.env` file containing `MONGODB_DATABASE_URL` for your MongoDB URL and `SERVER_PORT` if you want to specify the server's port.
- Run `npm install` to install the required dependencies.
- Run `npm start` to start the server or `npm run dev` with Nodemon.

## Trello Workspace

The official trello workspace for this project: <https://trello.com/b/NgVubCDX/portalguessr-fullstack>

## Discord

Join the Discord server to get the latest news about PortalGuessr: https://discord.gg/djWRTEM8XZ
