'use strict';

require('chai').should();

const mocks = require('./mocks');
const utils = require('../utils/utils');

describe('Parse events', function () {

  it('should parse the correct action', function () {
    utils._parseEvent(mocks.create).action.should.equal('create');
    utils._parseEvent(mocks.list).action.should.equal('list');
    utils._parseEvent(mocks.delete).action.should.equal('delete');
    utils._parseEvent(mocks.non_valid).action.should.equal('non');
  });

});
