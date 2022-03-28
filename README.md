# Boilerplate api

## Getting Started

Install packages:

```bash
yarn
```

This api was built to communicates to the app in the same repository.

This boilerplate supports basic CRUD functionality for the User entity which has username, email, and password as properties.

The detail environments for the app is below.

- Apollo-server-express
- TypeGraphql
- Typescript
- Argon2
- Redis

### Environment Variables

You should add `.env` file under the server directory, and fill your server information referring `.env.example` file. Completed filled out `.env` file must be looked like below.

```bash
DATABASE_URL=postgresql://postgres:@localhost:5432/dev;
REDIS_URL=127.0.0.1:6379;
PORT=4000
SESSION_SECRET=kasjdfoijxcovijoijeasdoifjoije
APP_URL=http://localhost:3000
```

### How to run

Create PostgreSQL database with the name `dev`.

If you have a different credentials set up for your local PostgresQL database, put that in `ormconfig.json`.
Afterwards, make sure you don't track updates to that file locally using the command below:

```bash
// Inside server directory
update-index --skip-worktree ./ormconfig.json
```

Run a redis server.

```bash
redis-server
```

Run the api server.

```bash
yarn dev
```
