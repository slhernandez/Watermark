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
Enter [http://localhost:3000/pdf](http://localhost:3000) (should get a list of PDF files stored in db)



## Client (React)

To run the web app (react), CD to the client folder and run the following commands:

```shell
cd client
npm install
npm start
```
Enter [http://localhost:8080](http://localhost:8080) (Load Watermark Tool page)

## Shortcoming
Below is a list of compromises made due to time constraints.
- There is no UI indicator to inform the user that the watermark PDF has finished processing to local storage. You currently have to wait 30 to 60 seconds before you are able to download the file. Clicking the download link just after upload is complete will generate an error. Optimal solution would be to hide the download link until watermark file processing is complete.
- The react app only allows PDF formatted files for upload. 
- The app only allows users to upload single PDF uploads. There is no multi-select support.
- Only unique PDF files can be uploaded (no duplicate uploads allowed). 
- No pagination support was applied to API request that retrieves all PDF files that have been uploaded.

## Changes required for S3 support

Uploads into the actual filesystem will be difficult to scale. Switching from local file storage to S3 would be an ideal solution. The following items would have to be applied to the current design.

- Setup an IAM User (with AWS account) and S3 bucket.
- NPM install aws-sdk 
- Create S3 bucket if one doesn't exist.
- Configure Multer's (middleware for handling mulipart/form-data) diskStorage setup to upload files to S3 bucket.
- There is a supporting middleware library called [multer-s3](https://www.npmjs.com/package/multer-s3) that makes S3 bucket configuration convenient.
- Setup the neccessary ACL values for S3 bucket.




