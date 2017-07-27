'use strict';

require('chai').should();

const mocks = require('./mocks');
const utils = require('../utils/utils');

describe('Parse events', function () {

  it('should parse the correct action', function () {
    utils.parseEvent(mocks.create).action.should.equal('create');
    utils.parseEvent(mocks.list).action.should.equal('list');
    utils.parseEvent(mocks.delete).action.should.equal('delete');
    utils.parseEvent(mocks.non_valid).action.should.equal('non');
  });

});
