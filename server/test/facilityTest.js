const Facility = require('../models/facilityModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

/**
 *  =====================================
 *            FACILITY TESTING
 *  =====================================
 */

// you can use a global variable if tests span many files
let currentResponse = null;

chai.use(chaiHttp);

//Testing block for facility
describe('Facilities', () => {
    //Before each test we empty the database
    beforeEach((done) => {
        Facility.remove({}, () => {
            done();
        });
    });

    /*
     * Test the /GET facility
     */
    describe('/GET/facility/filter facility', () => {
        it('it should GET all the facilitys', (done) => {
            chai.request(server)
                .get('/api/facility/filter')
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
     * Test the /POST facility
     */
    describe('/POST/facility/create facility', () => {
        it('it should POST a facility', (done) => {
            let facility = {
                name: 'testFacility',
                code: 'testCode',
                type: 'testType'
            };
            chai.request(server)
                .post('/api/facility/create')
                .send(facility)
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('code').eql(200);
                    res.body.should.have.property('message').eql('success');
                    res.body.should.have.property('data');
                    res.body.data.should.have
                        .property('name')
                        .eql(facility.name);
                    res.body.data.should.have
                        .property('code')
                        .eql(facility.code);
                    res.body.data.should.have
                        .property('type')
                        .eql(facility.type);
                    res.body.data.should.have.property('status').eql(true);
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('createdAt');
                    res.body.data.should.have.property('updatedAt');
                    done();
                });
        });
    });

    /*
     * Test the /PATCH facility
     */
    describe('/PUT/facility/update facility', () => {
        it('it should UPDATE a facility', (done) => {
            let facility = new Facility({
                name: 'testFacility',
                code: 'testCode',
                type: 'testType'
            });
            let updateFacility = {
                filter: facility.name,
                update: {
                    name: 'newFacilityTest',
                    code: 'newCodeTest',
                    type: 'newTypeTest'
                }
            };
            facility.save(() => {
                chai.request(server)
                    .patch('/api/facility/update')
                    .send(updateFacility)
                    .end((err, res) => {
                        should.exist(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('code').eql(200);
                        res.body.should.have.property('message').eql('success');
                        res.body.should.have.property('data');
                        res.body.data.should.have
                            .property('name')
                            .eql(updateFacility.update.name);
                        res.body.data.should.have
                            .property('code')
                            .eql(updateFacility.update.code);
                        res.body.data.should.have
                            .property('type')
                            .eql(updateFacility.update.type);
                        res.body.data.should.have.property('status').eql(true);
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('createdAt');
                        res.body.data.should.have.property('updatedAt');
                        done();
                    });
            });
        });
    });

    /*
     * Test the /DELETE facility
     */
    describe('/DELETE/facility/delete facility', () => {
        it('it should DELETE a facility', (done) => {
            let facility = new Facility({
                name: 'testFacility',
                code: 'testCode',
                type: 'testType'
            });
            let deleteFacility = {
                deleteList: ['testFacility']
            };
            facility.save(() => {
                chai.request(server)
                    .delete('/api/facility/delete')
                    .send(deleteFacility)
                    .end((err, res) => {
                        currentResponse = res;
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
