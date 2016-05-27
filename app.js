var t2 = require('./track2');
var fs = require('fs');
var xmldoc = require('xmldoc');
var util = require('./util')

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

var filename = './test2.xml'

// read in xml file here
fs.readFile(filename, "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
    processData(data);
})
