const Event = require('../models/eventModel');
const EventType = require('../models/eventTypeModel');
const User = require('../models/userModel');
const Facility = require('../models/facilityModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

/**
 *  =====================================
 *            EVENT TESTING
 *  =====================================
 */

// you can use a global variable if tests span many files
let currentResponse = null;

chai.use(chaiHttp);

//Testing block for event
describe('Events', () => {
    //Before each test we empty the database
    beforeEach((done) => {
        Event.remove({}, () => {
            done();
        });
    });

    /*
     * Test the /GET event
     */
    describe('/GET/event/filter event', () => {
        it('it should GET all the events', (done) => {
            chai.request(server)
                .get('/api/event/filter')
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('code').eql(200);
                    res.body.should.have.property('message').eql('success');
                    res.body.should.have.property('data');
                    done();
                });
        });
    });

    /*
     * Test the /POST event
     */
    describe('/POST/event/create event', () => {
        it('it should POST a event', (done) => {
            let eventType = new EventType({ name: 'testEventTypeName' });
            let user = new User({ email: 'test@gmail.com', role: ['1'] });
            let facility = new Facility({
                name: 'testFacility',
                code: 'testCode',
                type: 'testType'
            });

            let event = {
                eventName: 'testEventName',
                language: 'testLanguage',
                image: 'abcd',
                mode: 'testMode',
                location: 'testLocation',
                accommodation: 'testAccommodation',
                registrationCloseDate: Date.now() + 1,
                startDate: Date.now(),
                endDate: Date.now() + 2,
                maxParticipants: '20',
                tags: ['TEST', 'TAG'],
                description: 'testDescription',
                budget: '10000',
                ownerId: user._id,
                eventTypeId: eventType._id,
                tasks: [
                    {
                        name: 'testTaskName',
                        type: 'testTaskType',
                        startDate: Date.now(),
                        endDate: Date.now(),
                        userId: user._id
                    }
                ],
                borrowFacilities: [
                    {
                        facilityId: facility._id,
                        borrowDate: Date.now(),
                        returnDate: Date.now()
                    }
                ]
            };

            chai.request(server)
                .post('/api/event/create')
                .send(event)
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('code').eql(200);
                    res.body.should.have.property('message').eql('success');
                    res.body.should.have.property('data');
                    res.body.data.should.have
                        .property('eventName')
                        .eql(event.eventName);
                    res.body.data.should.have
                        .property('language')
                        .eql(event.language);
                    res.body.data.should.have.property('mode').eql(event.mode);
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('createdAt');
                    res.body.data.should.have.property('updatedAt');
                    done();
                });
        });
    });

    /*
     * Test the /PATCH event
     */
    // describe('/PUT/event/update event', () => {
    //     it('it should UPDATE a event', (done) => {
    //         let eventType = new EventType({ name: 'testEventTypeName' });
    //         let user = new User({ email: 'test@gmail.com', role: ['1'] });
    //         let event = new Event({
    //             eventName: 'testEventName',
    //             language: 'testLanguage',
    //             image: 'abcd',
    //             mode: 'testMode',
    //             location: 'testLocation',
    //             accommodation: 'testAccommodation',
    //             registrationCloseDate: Date.now() + 1,
    //             startDate: Date.now(),
    //             endDate: Date.now() + 2,
    //             maxParticipants: '20',
    //             tags: ['TEST', 'TAG'],
    //             description: 'testDescription',
    //             budget: '10000',
    //             ownerId: user._id,
    //             eventTypeId: eventType._id
    //         });
    //         let updateEvent = {
    //             _id: event._id,
    //             eventName: 'newEventNameTest',
    //             language: 'newLanguageTest',
    //             mode: 'newModeTest'
    //         };
    //         event.save((err, event) => {
    //             chai.request(server)
    //                 .patch('/api/event/update')
    //                 .send(updateEvent)
    //                 .end((err, res) => {
    //                     currentResponse = res;

    //                     res.should.have.status(200);
    //                     res.body.should.be.a('object');
    //                     res.body.should.have.property('code').eql(200);
    //                     res.body.should.have.property('message').eql('success');
    //                     res.body.should.have.property('data');
    //                     res.body.data.should.have
    //                         .property('eventName')
    //                         .eql(updateEvent.update.eventName);
    //                     res.body.data.should.have
    //                         .property('language')
    //                         .eql(updateEvent.update.language);
    //                     res.body.data.should.have
    //                         .property('mode')
    //                         .eql(updateEvent.update.mode);
    //                     res.body.data.should.have.property('_id');
    //                     res.body.data.should.have.property('createdAt');
    //                     res.body.data.should.have.property('updatedAt');
    //                     done();
    //                 });
    //         });
    //     });
    // });

    /*
     * Test the /DELETE event
     */
    describe('/DELETE/event/delete event', () => {
        it('it should DELETE a event', (done) => {
            let eventType = new EventType({ name: 'testEventTypeName' });
            let user = new User({ email: 'test@gmail.com', role: ['1'] });
            let facility = new Facility({
                name: 'testFacility',
                code: 'testCode',
                type: 'testType'
            });

            let event = {
                eventName: 'testEventName',
                language: 'testLanguage',
                mode: 'testMode',
                image: 'abcd',
                location: 'testLocation',
                accommodation: 'testAccommodation',
                registrationCloseDate: Date.now() + 1,
                startDate: Date.now(),
                endDate: Date.now() + 2,
                maxParticipants: '20',
                tags: ['TEST', 'TAG'],
                description: 'testDescription',
                budget: '10000',
                ownerId: user._id,
                eventTypeId: eventType._id,
                tasks: [
                    {
                        name: 'testTaskName',
                        type: 'testTaskType',
                        startDate: Date.now(),
                        endDate: Date.now(),
                        userId: user._id
                    }
                ],
                borrowFacilities: [
                    {
                        facilityId: facility._id,
                        borrowDate: Date.now(),
                        returnDate: Date.now()
                    }
                ]
            };

            user.save(() => {
                facility.save(() => {
                    chai.request(server)
                        .post('/api/event/create')
                        .send(event)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('code').eql(200);
                            res.body.should.have
                                .property('message')
                                .eql('success');
                            res.body.should.have.property('data');
                            res.body.data.should.have
                                .property('eventName')
                                .eql(event.eventName);
                            res.body.data.should.have
                                .property('language')
                                .eql(event.language);
                            res.body.data.should.have
                                .property('mode')
                                .eql(event.mode);
                            res.body.data.should.have.property('_id');
                            res.body.data.should.have.property('createdAt');
                            res.body.data.should.have.property('updatedAt');
                            done();
                        });
                });
            });
        });
    });

    //After each we console log the error or response (Only for debug)
    afterEach(function () {
        const errorBody = currentResponse && currentResponse.body;

        if (this.currentTest.state === 'failed' && errorBody) {
            console.log('This is a response: ', errorBody);
        }

        currentResponse = null;
    });
});
