var util = require('./util');
var fs = require('fs');
var xmldoc = require('xmldoc');
var http = require('http');

var filename = './test2.xml'

function processRecord(record) {
    var nameElement = record.childNamed("Name");
    var track2Element = record.childNamed("Track2");

    var name = util.parseName(nameElement.val);
    var track2 = util.parseTrack2(track2Element.val);

    console.log(track2Element.val);
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

loadData();
