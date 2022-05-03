# Bringing Home the Bacon
A six-degrees of Kevin Bacon App Made in React. In this game you attempt to connect a random starting actor to Kevin Bacon through actors via movies in which they have appeared.

## Installation Instructions

For now the app can be found at [bhtb.netlify.app](https://bhtb.netlify.app), but if you would like to run a local copy follow the instructions below.

Clone the repo.
```bash
git@github.com:e-bierschenk/BHtB-FrontEnd-Capstone.git
```
Install the react app.
```bash
npm install
``` 
Register for [imdb-api key](https://imdb-api.com/Identity/Account/Register). Rename settings.js.example to settings.js.  Replace "My Key" in settings.js with your key from imdb-api.
```bash
cd modules
mv Settings.js.example Settings.js
```
Rename json db and start json server.
```bash
cd ./api
mv database.json.start database.json
json-server -p 8088 -w database.json
```
Start the app.
```bash
npm start
```


## Wireframe

![wireframe](/assets/wireframe.png)

## ERD

![ERD](/assets/ERD.png)