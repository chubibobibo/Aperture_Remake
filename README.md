# Aperture
Aperture is a webapp project created using MERN stack. It is an online photo sharing platform where photographer can share and specify the locations where their photos are taken. Users can interact with other members photos by rating and commenting on it.  

## Prerequisites
* A machine that has nodeJs
* An account in [MongoDb Atlas](https://account.mongodb.com/account/login)
* A cloudinary account
* A mapbox account

## Getting the app running locally
* `git clone` this repo `https://github.com/chubibobibo/Aperture_Remake`
* Navigate to the root of the server and client folder then `npm install` to install dependencies
* create a `.env` file in the root of server folder
 ```js
MONGO_SECRET=<"provide your secret key">  
MONGO_ATLAS=<"your mongo atlas network access">

SESSION_NAME=<"provide your session name">
SESSION_SECRET=<"provide your secret key for session">

CLOUD_NAME=<"provide your cloudinary newtwork access">
CLOUD_API_KEY=<"provide your cloudinary api key">
CLOUD_API_SECRET=<"provide your cloudinary secret key">

DEV_ENV='development'
```
* Create a `.env` file in the root of client folder
```js
VITE_MAPBOX=<"provide your mapbox api key">
```


* run the application using `npm run dev`

