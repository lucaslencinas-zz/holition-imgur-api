# Holition's Imgur API - Details

This file exists just to justify a couple of decisions that I took, things to improve and other things worth to mention. The most important thing that gathers all aspect is that I did it with short amount of time because I think it is a quite big assignment.

- Separation of a API and a UI as separate projects. Basically because it was easier to setup the UI using [create-react-app](https://github.com/facebook/create-react-app) and handling the routing on it's own. And using the API just for handling all the rest, being agnostic of the client.
- More improvements to error handling due to auth errors. 401 or 403 instead of 500. Same with some validations. `usernames` and `imgIds` without spaces for now. Same for wrong URLs.
- Middleware for validating missing fields. It is not the best thing to do it in this way. I would write the spec of the API using [RAML](https://raml.org/) and then use [Osprey](https://www.npmjs.com/package/osprey) to validate every request against the RAML. Or maybe just a [express-validation](https://www.npmjs.com/package/express-validation)
- token-based vs session-based authorization and authentication: was I planned since the beginning was to be able to implement it and test it using Postman and then from the UI, so it was easy to use tokens rather than sessions. Just because of that.
- authorization: I would have use some `ACL` or `resource based` authorization but as this tasks was rather simple in term of authn and authz I implement just the basic. It can be improved a lot.
- scafolding and structure: router => middlewares => controllers => services => repositories
- 2 different calls for getting the profile. Just because in the UI I wanted to make an extra API call to render the Profile page with more info. Nothing else.
- With a little change I could have access to other user public images. Now with the current code I cannot access that. I have to change the logic to bypass the `sameUsernameMiddleware` and querying only public content.
- Use [config files](https://www.npmjs.com/package/config) for better parametrization and avoid duplicating global and constant.
- Just basic testing. Unit and e2e but only happy paths.
- If relational database was needed I woul use PostgresQL and [Knex](https://knexjs.org/) as a query builder.
- When doing commits I didn't test right away due to time constraint. I tested at the end. It wouldn't be like this. Each feature has it tests in the correct branch to be seen before merging it to master.
- I developed this using a Mac OSX. It would be nice to use docker images for the database and the node server just for being agnostic of the operating system.
