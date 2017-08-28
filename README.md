## DOS is a boilerplate stack for building Node.js projects with Express & Posgres

DOS helps you start building Node.js projects faster. DOS is a boilerplate project with minimal set of configured dependencies to let you start with Node.js using Express, Postgres & Passport. 

### Features:

* Express with JSON body parser, cookie parser, session
* global error handling for 404 & 500 
* env variables
* Postgres with connection pool
* Passport with LocalStrategy & Postgres
* authentication endpoints
* session storage in Postgres
* health-check endpoint with DB check
* admin section of app with Handlebars
* loggers
* test runner using Jest

### How to start:

1. Clone repository
1. Run ```npm install```
1. Create new database in Postgres
1. Run ```init.sql``` script in Posgres
1. Run ```npm test``` to check if everything works
1. Enjoy & build great apps 😀 

### Users in DB:

Passport with LocalStrategy & Postgres is configured for login endpoints. Since registration is often app & domain specific, there is no configuration for registration endpoint. The easiest way to see how admin site work, you need to insert manually. You need to generate password for admin using `bcrypt`. In project directory run `node` and then:

```
const bcrypt = require('bcrypt')
const pass = 'you password goes here'
const saltRounds = 10 //the higher the better - the longer it takes to generate & compare
bcrypt.hashSync(pass, saltRounds)
```

You'll get generated password and now you need to insert user to DB.

```
INSERT INTO users(username, password, type) VALUES ('username', 'password', 'admin');
```

### Commands:

* Start server:
```
npm start
```

* Debug server:
```
npm run debug
```

* Test
```
npm test
```

### Used packages: 

- bcrypt -> https://github.com/kelektiv/node.bcrypt.js/ - One of the most fundamental security concern is storing passwords in application. In DOS we're using bcypt to generate salt and hash passwords. bcrypt is a password hashing function. bcrypt uses salt to protect against rainbow table attacks. What is crucial, bcrypt is adaptive function -> over time the iteration time can be increased in order to make it slower to remain resistant to increasing computation power. NPM package is using native implementation of bcrypt. 

- body-parser -> https://github.com/expressjs/body-parser - Body parsing middleware - parses incoming request body and expose it under `req.body` property. In DOS  we're using JSON and URL-encoded parser as top-level middleware.

- connect-pg-simple -> https://github.com/voxpelli/node-connect-pg-simple - express-session comes in bundled with in-memory session. However, in-memory session is not suitable for production apps. One of the most popular session storage is Redis.  We're using PostgreSQL in DOS and we're going to store session data inside our Postgres db. We're using connection pool (pg.Pool) for the underlying db module.

- cookie-parser -> https://github.com/expressjs/cookie-parser - Exposes cookies under `req.cookie` property

- express -> https://github.com/expressjs/express - DOS choice for Node.js minimalistic web framework

- express-handlebars -> https://github.com/ericf/express-handlebars - Handlebars is templating language for dynamic HTML. express-handlebars is view engine for Express using Handlebars templates. In DOS we're using Handlebars and server-side rendering for administration part of application.

- express-session -> https://github.com/expressjs/session - Session middleware for Express with build-in in-memory session storage. In DOS we're using connect-pg-simple to store session data in Postgres 

- express-validator -> https://github.com/ctavan/express-validator - `node-validator` middleware for Express. Beside frontend validation of forms, it's important to implement validation on backend side. That's the only reliable validation for incoming data and the one that must be present in any web application.  

- method-override -> https://github.com/expressjs/method-override - Middleware for Express enabling HTTP verbs like PUT or DELETE in case where client doesn't support it. 

- morgan -> https://github.com/expressjs/morgan - Request logger middleware for Express.

- passport -> https://github.com/jaredhanson/passport - Authentication middleware for Express. The main idea of Passport is extensible set of plugins known as strategies. There are variety of different strategies, which could authenticate users by username & password, OAuth like Facebook, Twitter or Google and many others. Passport maintains persistent login session, which requires both serialization and deserialization of `authenticated user`.

- passport-local -> https://github.com/jaredhanson/passport-local - Authentication strategy for Passport using username & password. In DOS, we're combining local strategy with Postgres to authenticate users with username and hashed password stored in db

- pg -> https://github.com/brianc/node-postgres - Non-blocking PostgreSQL client for Node.js

- winston -> https://github.com/winstonjs/winston - Logging library for Node.js with support for multiple transports. Winston provides many features beside normal `console` statements like default & custom loggers, multiple transports, streaming logs, different log levels.

### Authors

Marek Piechut [@marekpiechut](http://twitter.com/@marekpiechut)
Bartek Witczak [@bartekwitczak](http://twitter.com/@bartekwitczak)

### License

DOS starter kit is licensed under the MIT License so you can use it in free, opensource and commercial projects. Whichever you like. See [LICENSE.md] for details
