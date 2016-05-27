var t2 = require('./track2');
var fs = require('fs');
var xmldoc = require('xmldoc');

function processData(data) {
    var records = new xmldoc.XmlDocument(data);
    
    records.eachChild(function (record) {
        var name = record.childNamed("Name");
        console.log(name.val);
        
        // parse name here using regular expression
        
        var track2 = record.childNamed("Track2");
        console.log(track2.val);
        
        // parse track2 here using t2
        
    });
}

// read in xml file here
fs.readFile("./test2.xml", "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }
    processData(data);
})

// parsing track2
// var track = ";6462739752506999=15122081411? ";
// var p = new t2.SwipeParserObj(track);
// console.log("account = " + p.account);
// console.log("expiration month = " + p.exp_month);
// console.log("expiration year = " + p.exp_year);
// console.log("service code = " + p.service_code);