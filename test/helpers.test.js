'use strict';

require('chai').should();

const mocks = require('./mocks');
const utils = require('../utils/helpers');

describe('Parse events', () => {

  it('should parse the correct action', () => {
    utils.parseEvent(mocks.create).action.should.equal('create');
    utils.parseEvent(mocks.list).action.should.equal('list');
    utils.parseEvent(mocks.delete).action.should.equal('delete');
    utils.parseEvent(mocks.non_valid).action.should.equal('non');
  });

});
