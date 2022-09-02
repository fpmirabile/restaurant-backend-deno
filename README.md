# TP Aplicaciones distribuidas - backend

This backend has been done in **DENO** with Oak library and **< database library here >** for the 2nd semester of 2022.

## Installation

You can take one of those two routes, for local development I'd suggest to use BOTH. 
Since you can edit swagger as long as you are coding.

1. Install Deno, you can follow their website [here](https://deno.land/#installation). Once installed you can check version with `deno --version` on your favorite terminal.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. Install docker desktop based on your OS. You can find it [here](https://www.docker.com/products/docker-desktop/).


2. Clone this repository and that's it.

## Running with docker

To run the project, be sure that your have been in step 1. Be sure your docker engine is running on your OS (You will find the docker icon in the topbar or bottom bar if you are windows).
Then, if it is the first time you'll be running this container you can try `docker-compose build`. This command will download every image from docker.
Last but not least, you can run this project with `docker-compose up` afterwards and the api will be running with docker.

## Running with terminal

To run this project, you just run `deno run --allow-net --allow-read --allow-env src/server.ts` from the cloned folder.
Take in consideration that, this step won't run the swagger openapi documentation.

## Why Deno?

Because is a new framework and we wanted to try it out, and Oak is very similar to Express, so the learning curve wouldn't be that bad.

## Swagger

TBD