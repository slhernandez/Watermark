# Watermark App

## Pre-requisite:
The server (express) utilizes a library called [image-watermark](https://github.com/luthraG/image-watermark). This library is based on ImageMagick for node.js and Ghostscript which is used as an interpreter for PostScript and PDF files. Both ImageMagick and Ghostscript will need to be installed before setting up the server.  Image-watermark will be installed via npm install.

Run the following commands (Mac OS X)
```shell
brew install imagemagick
brew install ghostscript
```

## Postgresql (ElephantSQL)

For server-side state presistence I decided to use a free PostgreSQL database called [ElephantSQL](https://www.elephantsql.com/). The PostgreSQL database is managed online and is currently already setup and ready for our watermark server. To properly setup the db connection the following config settings located in .env file (currently named .env_sample) will need to be updated.

```shell
DB_HOST='YOUR_DB_HOST_HERE'
DB_PORT='YOUR_DB_PORT_HERE'
DB_USER='YOUR_DB_USER_HERE'
DB_PASSWORD='YOUR_DB_PASSWORD_HERE'
DB_NAME='YOUR_DB_NAME_HERE'
```

For security reasons, the values for these db settings will be sent via email. Once the proper settings have been applied, rename .env_sample to .env for [dotenv](https://github.com/motdotla/dotenv) to pickup.

The command that was used to create the PostgreSQL table can be referenced in the SQL folder found in server.

## Server (Express Server)

CD to the server folder and run the following commands:

```shell
cd server
npm install
npm start
```

## Client (React)

To run the web app (react), CD to the client folder and run the following commands:

```shell
cd client
npm install
npm start
```

