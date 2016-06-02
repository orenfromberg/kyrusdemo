var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var util = require('../util');
var fs = require('fs');
var xmldoc = require('xmldoc');

var filename = '../test2.xml'

function processData(data) {
  var records = new xmldoc.XmlDocument(data);

  var retData = [];

  for (i = 0; i < records.children.length; i++) {
    var record = records.children[i];
    var nameElement = record.childNamed("Name");
    var track2Element = record.childNamed("Track2");
    var name = util.parseName(nameElement.val);
    var track2 = util.parseTrack2(track2Element.val);

    retData.push({
      firstName: name.firstName,
      middleName: name.middleName,
      lastName: name.lastName,
      account: track2.account,
      exp_month: track2.exp_month,
      exp_year: track2.exp_year,
      service_code: track2.service_code
    });
  }

  return retData;
}

function loadData() {
  var contents = fs.readFileSync(filename, 'utf8');
  return processData(contents);
}

function getTableData() {
    tableData = '';
    var length = myData.length;
    for (i = 0; i < length; i++) {
        tableData += '<tr>' +
            '<td>' + myData[i].lastName + '</td>' +
            '<td>' + myData[i].firstName + '</td>' +
            '<td>' + myData[i].middleName + '</td>' +
            '<td>' + myData[i].account + '</td>' +
            '<td>' + myData[i].exp_month + '</td>' +
            '<td>' + myData[i].exp_year + '</td>' +
            '<td>' + myData[i].service_code + '</td>' +
            '</tr>';
    }
    return tableData;
}

function buildHtml() {
    var header = '<link rel="stylesheet" href="stylesheets/sortable-theme-dark.css" />';
    var body = '<script src="javascripts/sortable.min.js"></script> ' +
        '<table class="sortable-theme-dark" data-sortable>' +
        '<thead><tr>' +
        '<th>last name</th>' +
        '<th>first name</th>' +
        '<th>middle name</th>' +
        '<th>account #</th>' +
        '<th>exp month</th>' +
        '<th>exp year</th>' +
        '<th>service code</th>' +
        '</tr></thead>' +
        getTableData() +
        '</table>';

    return '<html><head>' + header +
        '</head><body>' + body +
        '</body></html>';
}

function writeSqlDb(myData) {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('accounts.db');

    db.serialize(function () {
        db.run("drop table if exists content");
        db.run("CREATE TABLE content (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, middle_name TEXT NOT NULL, last_name TEXT NOT NULL, account TEXT NOT NULL, exp_month INTEGER NOT NULL, exp_year INTEGER NOT NULL, service_code INTEGER NOT NULL)");

        var len = myData.length;
        var cmd = '';
        for (i = 0; i < len; i++) {
            cmd = "INSERT INTO content (first_name, middle_name, last_name, account, exp_month, exp_year, service_code) VALUES (" +
                "'" + myData[i].firstName + "', " +
                "'" + myData[i].middleName + "', " +
                "'" + myData[i].lastName + "', " +
                "'" + myData[i].account + "', " +
                myData[i].exp_month + ", " +
                myData[i].exp_year + ", " +
                myData[i].service_code + ");";
            db.run(cmd);
        }
        db.close();
    });
}

// load data from test2.xml
var myData = loadData();

// write out sqlite database of account info
writeSqlDb(myData);

// create html table to display
var html = buildHtml();
fs.writeFileSync('./public/index.html', html);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
