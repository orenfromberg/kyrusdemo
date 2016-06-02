# Demo for Kyrus - Programming Challenge

### by [Oren Fromberg](mailto:orenfromberg@gmail.com) on 6/2/16

For this programming challenge, I used the information on [this site](http://www.acmetech.com/blog/magnetic-track-data-parsers/) to decode the Track2 data, specifically [this file](http://www.acmetech.com/documentation/javascript/parse_magnetic_track_javascript.html).

For the sortable table, I used [this library](http://github.hubspot.com/sortable/).

For writing the SQLite database, I used [this library](https://github.com/mapbox/node-sqlite3).

Most of the code that I wrote is in `util.js` and `mykyrusdemo/app.js`.

## 1. Setup
Install Node.js v4.4.5 [here](https://nodejs.org/en/).

## 2. Run
at the command line, run the following commands:
```
> cd mykyrusdemo
> npm install
> npm start
```

Open a browser and point it to [http://localhost:3000/](http://localhost:3000/).

You will see a sortable table populated with data. This is `mykyrusdemo/public/index.html`.

An sqlite database will be written to `myyrusdemo/accounts.db` that contains all the data from `test2.xml`.

## 3. Unit Tests

Run unit tests with:
```
> mocha
```