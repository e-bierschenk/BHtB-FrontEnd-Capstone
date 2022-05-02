# Bringing Home the Bacon
A six-degrees of Kevin Bacon App Made in React. In this game you attempt to connect a random starting actor to Kevin Bacon through actors via movies in which they have appeared.

## Installation Instructions

1. Clone the repo
```bash
git@github.com:e-bierschenk/BHtB-FrontEnd-Capstone.git
```
2. Install the react app
```bash
npm install
``` 
3. Register for [imdb-api key](https://imdb-api.com/Identity/Account/Register). Rename settings.js.example to settings.js.  Replace "My Key" in settings.js with your key from imdb-api.
```bash
cd modules
mv Settings.js.example Settings.js
```
4. Rename json db and start json server.
```bash
cd ./api
mv database.json.start database.json
json-server -p 8088 -w database.json
```


## Wireframe

![wireframe](/assets/wireframe.png)

## ERD

![ERD](/assets/ERD.png)