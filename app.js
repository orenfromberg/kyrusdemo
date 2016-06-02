var util = require('./util');
var fs = require('fs');
var xmldoc = require('xmldoc');
var http = require('http');

var filename = './test2.xml'
// var myData = [];

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

function buildHtml(request) {
    var header = '';
    var body = '' +
        '<table>' +
        '<tr>' +
        '<th>last name</th>' +
        '<th>first name</th>' +
        '<th>middle name</th>' +
        '<th>account #</th>' +
        '<th>exp month</th>' +
        '<th>exp year</th>' +
        '<th>service code</th>' +
        '</tr>' +
        getTableData() +
        '</table>';

    // concatenate header string
    // concatenate body string

    return '<html><head>' + header +
        '</head><body><b>' + body +
        '</b></body></html>';
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

var myData = loadData();

writeSqlDb(myData);

http.createServer(function (request, response) {
    var html = buildHtml(request);

    // Send the HTTP header 
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': html.length,
        'Expires': new Date().toUTCString()
    });

    // Send the response body as "Hello World"
    response.end(html);
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
