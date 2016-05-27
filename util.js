function processResult(result) {
    if (result != null)
        return result[0].trim();
    else
        return "";
}

function parseName(fullname) {
    var first_re = /^([\w]*|[\w]\.)\s/g;
    var middle_re = /\s([\w\.]*\s)/g;
    var last_re = /([\w]*|[\w]\.)$/g;
    var first = processResult(first_re.exec(fullname));
    var middle = processResult(middle_re.exec(fullname));
    var last = processResult(last_re.exec(fullname));
    return { firstName: first, middleName: middle, lastName: last };
}

// The following two functions were adapted from code here:
// http://www.acmetech.com/documentation/javascript/parse_magnetic_track_javascript.html
// linked to by this page:
// http://www.acmetech.com/blog/magnetic-track-data-parsers/
function stripAlpha(sInput) {
    if (sInput == null) return '';
    return sInput.replace(/[^0-9]/g, '');
}

function parseTrack2(data) {
    var nSeperator = data.indexOf("=");
    var sCardNumber = data.substring(1, nSeperator);
    var sYear = data.substr(nSeperator + 1, 2);
    var sMonth = data.substr(nSeperator + 3, 2);
    var sService = data.substr(nSeperator + 5, 3);
    return {
        account: sCardNumber,
        exp_month: sMonth,
        exp_year: '20' + sYear,
        service_code: stripAlpha(sService)
    }
}

module.exports = {
    processResult: processResult,
    parseName: parseName,
    stripAlpha: stripAlpha,
    parseTrack2: parseTrack2
}