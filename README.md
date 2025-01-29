

# Project setup

## Set database

Run a postgres database, then set its connection url in `DATABASE_URL` in shell env variables or `.env` file.

## Run the project

First build with `npm run build`, then run it with `npm run start`.
In the build phase, the database client is generated, and in start phase, the client connects to database and runs the migrations.

# Potential Improvements
- Authentication and authorization.
- A panel for sale persons for showing the leads assigned to them.
- Connecting the system to a CRM pipeline, including after-sale support, warehousing, etc.
- More fields for leads. Even an ability for adding fields dynamically.
