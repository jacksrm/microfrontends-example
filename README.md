# Product List and Cart Example

This project is an example of an application created using microfrontend architecture. I created it as way to practice using the Single-SPA Framework.

In this project, the objective was to learn how to use Single-SPA Layout Engine, use TailwindCSS to style the application, use the CustomEvents Javascript API to make the communication between parcels, use a monorepo as the repository technique and to use Docker as a way to deploy the APP.

Each microfrontend app was built with NodeJS and served with a NGINX Server.

## How to run (dev)
- Clone the repo in your machine
- Run the command `yarn` to install the dependencies
- Run `yarn start` to run the project

## How to run (build with docker)
- Clone the repo in your machine
- In the terminal run `docker compose up -d` to build
- Access `http://localhost:9000` to access the app.