var assert = require('chai').assert;
var util = require('../util')

describe('#processResult()', function () {
    it('should return an empty string when input is null', function () {
        assert.equal("", util.processResult(null));
    });
    it('should return a trimmed string when input has surrounding white space', function () {
        assert.equal("some text", util.processResult(["  some text   "]));
    });
});

describe('#parseName()', function () {
    it('should parse correctly when given "Oren M. Fromberg"', function () {
        var name = util.parseName("Oren M. Fromberg");
        assert.equal("Oren", name.firstName);
        assert.equal("M.", name.middleName);
        assert.equal("Fromberg", name.lastName);
    });
    it('should parse correctly when given "O. M. Fromberg"', function () {
        var name = util.parseName("O. M. Fromberg");
        assert.equal("O.", name.firstName);
        assert.equal("M.", name.middleName);
        assert.equal("Fromberg", name.lastName);
    });
    it('should parse correctly when given "O. Moses Fromberg"', function () {
        var name = util.parseName("O. Moses Fromberg");
        assert.equal("O.", name.firstName);
        assert.equal("Moses", name.middleName);
        assert.equal("Fromberg", name.lastName);
    });
    it('should parse correctly when given " M. Fromberg"', function () {
        var name = util.parseName(" M. Fromberg");
        assert.equal("", name.firstName);
        assert.equal("M.", name.middleName);
        assert.equal("Fromberg", name.lastName);
    });
    it('should parse correctly when given "Oren Moses Fromberg"', function () {
        var name = util.parseName("Oren Moses Fromberg");
        assert.equal("Oren", name.firstName);
        assert.equal("Moses", name.middleName);
        assert.equal("Fromberg", name.lastName);
    });
    it('should parse correctly when given "Oren Fromberg"', function () {
        var name = util.parseName("Oren Fromberg");
        assert.equal("Oren", name.firstName);
        assert.equal("", name.middleName);
        assert.equal("Fromberg", name.lastName);
    });
});

describe('#stripAlpha()', function () {
    it('should remove non-numeric characters from a string', function () {
        assert.equal("35719735", util.stripAlpha("357H197a35"));
    });
});

