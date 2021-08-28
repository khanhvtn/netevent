const EventType = require('../models/eventTypeModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

/**
 *  =====================================
 *           EVENT TYPE TESTING
 *  =====================================
 */

// you can use a global variable if tests span many files
let currentResponse = null;

chai.use(chaiHttp);

//Testing block for eventType
describe('EventTypes', () => {
    //Before each test we empty the database
    beforeEach((done) => {
        EventType.remove({}, () => {
            done();
        });
    });

    /*
     * Test the /GET eventType
     */
    describe('/GET/eventType/filter eventType', () => {
        it('it should GET all the eventTypes', (done) => {
            chai.request(server)
                .get('/api/eventType/filter')
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
     * Test the /POST eventType
     */
    describe('/POST/eventType/create eventType', () => {
        it('it should POST a eventType', (done) => {
            let eventType = {
                name: 'testEventTypeName'
            };
            chai.request(server)
                .post('/api/eventType/create')
                .send(eventType)
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('code').eql(200);
                    res.body.should.have.property('message').eql('success');
                    res.body.should.have.property('data');
                    res.body.data.should.have
                        .property('name')
                        .eql(eventType.name);
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('createdAt');
                    res.body.data.should.have.property('updatedAt');
                    done();
                });
        });
    });

    /*
     * Test the /PATCH eventType
     */
    describe('/PUT/eventType/update eventType', () => {
        it('it should UPDATE a eventType', (done) => {
            let eventType = new EventType({ name: 'testEventTypeName' });
            let updateEventType = {
                filter: eventType.name,
                update: {
                    name: 'newEventTypeTestName'
                }
            };
            eventType.save(() => {
                chai.request(server)
                    .patch('/api/eventType/update')
                    .send(updateEventType)
                    .end((err, res) => {
                        should.exist(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('code').eql(200);
                        res.body.should.have.property('message').eql('success');
                        res.body.should.have.property('data');
                        res.body.data.should.have
                            .property('name')
                            .eql(updateEventType.update.name);
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('createdAt');
                        res.body.data.should.have.property('updatedAt');
                        done();
                    });
            });
        });
    });

    /*
     * Test the /DELETE eventType
     */
    describe('/DELETE/eventType/delete eventType', () => {
        it('it should DELETE a eventType', (done) => {
            let eventType = new EventType({ name: 'testEventTypeName' });
            let deleteEventType = {
                deleteList: ['testEventTypeName']
            };
            eventType.save(() => {
                chai.request(server)
                    .delete('/api/eventType/delete')
                    .send(deleteEventType)
                    .end((err, res) => {
                        should.exist(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('code').eql(200);
                        res.body.should.have.property('message').eql('success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('ok').eql(1);
                        done();
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
