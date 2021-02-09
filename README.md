# exam-api

## How to run

### Requirements

To run the application you will need:
* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Docker](https://docker.com/)

```bash
# install Postgres image
$ docker run --name imagename -e POSTGRES_PASSWORD=yourPassword -p 5432:5432 -d postgres

# start Postgres
$ docker start imageName

```
### run exam-api
Now clone the repository and install the dependencies.
```bash
# to clone the repository
$ git clone https://github.com/gwerle/exam-api.git

# go into the backend folder
$ cd exam-api

#install the backend dependencies
$ yarn

```
Modify you ormconfit.ts to use yourPassword and imageName

Insert an enviroment variable in your system called DB_PORT, using the port of your db created in your docker

```bash

# run migrations
$ yarn typeorm migration:run

# run api
$ yarn dev:server
```
