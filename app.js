var util = require('./util');
var fs = require('fs');
var xmldoc = require('xmldoc');
var http = require('http');

var filename = './test2.xml'
var data = [];

function processRecord(record) {
    var nameElement = record.childNamed("Name");
    var track2Element = record.childNamed("Track2");

    var name = util.parseName(nameElement.val);
    var track2 = util.parseTrack2(track2Element.val);

    data.push({
        firstName: name.firstName,
        middleName: name.middleName,
        lastName: name.lastName,
        account: track2.account,
        exp_month: track2.exp_month,
        exp_year: track2.exp_year,
        service_code: track2.service_code
    });

    // console.log(track2Element.val);
}

function processData(data) {
    var records = new xmldoc.XmlDocument(data);
    records.eachChild(processRecord);
}

function loadData() {
    fs.readFile(filename, "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        processData(data);
    })
}

function getTableData()
{
    tableData = '';
    var length = data.length;
    for (i = 0; i < length; i++) {
        tableData += '<tr>' +
        '<td>' + data[i].lastName + '</td>' +
        '<td>' + data[i].firstName + '</td>' +
        '<td>' + data[i].middleName + '</td>' +
        '<td>' + data[i].account + '</td>' +
        '<td>' + data[i].exp_month + '</td>' +
        '<td>' + data[i].exp_year + '</td>' +
        '<td>' + data[i].service_code + '</td>' +
        '</tr>';
    }
    return tableData;
}

function buildHtml(request) {
    var header = '';
    var body = 
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

loadData();

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