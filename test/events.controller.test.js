'use strict';

require('chai').should();

const mocks = require('./mocks');
const Event = require('../controllers/events.controller');

describe('Events', function () {
  let event = '';

  beforeEach(() => {
    event = new Event();
  });

  it('should try to insert an event', () => {
    event.createEvent(mocks.create).should.be.a('number');
    event.createEvent(null).should.be.false;
    event.createEvent(false).should.be.false;
    event.createEvent().should.be.false;
    event.createEvent('').should.be.false;
  });

  it('should list events', () => {
    event.listEvents().should.eql([]);
    event.createEvent(mocks.create);
    event.listEvents().should.have.lengthOf(1);

  });

  it('should try to delete an event', () => {
    event.createEvent(mocks.create);
    event.deleteEvent(0).should.be.true;
    event.listEvents().should.eql([]);
    event.deleteEvent(999).should.be.false;
  });

  it('should process the slack message correctly', () => {
    event.processMessage(mocks.create);
    event.listEvents().should.have.lengthOf(1);
    event.processMessage(mocks.delete);
    event.listEvents().should.have.lengthOf(0);
    event.processMessage(mocks.create);
    event.processMessage(mocks.delete_non_valid);
    event.listEvents().should.have.lengthOf(1);
  });

});
