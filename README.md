<div style="display: flex; align-items: center;">

<img width="50px" src="https://i.ibb.co/MZ57TbN/Frame-11.png" alt="logo" />
<h1 style="margin: 0; margin-left:30px; vertical-align: center;">
College system - API
</h1>
</div>

## Description
API to serve the client for the college system. College system is a project example to simulate a system for students manage their disciplines. Built with Typescript and Express.

## Pre requirements
- NodeJS
- MongoDB community or Docker and Docker Compose
- Yarn

## How to run
- Install the dependencies with the command `yarn`
- Run mongoDB either via the local service or through the docker-compose.yml
- Fill the .env file
- Run `yarn dev` 

## Documentation
To see the documentation and test the routes, run the project and access the /docs path.

## Automatic tests
Run the `yarn test` to run the tests. It'll create a folder called "coverage" with the file coverage/lcov-report/index.html showing info collected from the tests.
