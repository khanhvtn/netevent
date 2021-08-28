const FacilityHistory = require('../models/facilityHistoryModel');
const Facility = require('../models/facilityModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

/**
 *  =====================================
 *        FACILITY HISTORY TESTING
 *  =====================================
 */

// you can use a global variable if tests span many files
let currentResponse = null;

chai.use(chaiHttp);

//Testing block for facility history
describe('Facility Histories', () => {
    //Before each test we empty the database
    beforeEach((done) => {
        FacilityHistory.remove({}, () => {
            done();
        });
    });

    /*
     * Test the /GET facility hisotry
     */
    describe('/GET/facilityHisotry/filter facilityHisotry', () => {
        it('it should GET all the facilityHistories', (done) => {
            chai.request(server)
                .get('/api/facilityHistory/filter')
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
     * Test the /POST facilityHistory
     */
    describe('/POST/facilityHistory/create facilityHistory', () => {
        it('it should POST a facilityHistory', (done) => {
            let facility = new Facility({
                name: 'testFacilityName',
                code: 'testCode',
                type: 'testType'
            });

            let facilityHistory = {
                facilityId: facility._id,
                borrowDate: Date.now(),
                returnDate: Date.now()
            };

            chai.request(server)
                .post('/api/facilityHistory/create')
                .send(facilityHistory)
                .end((err, res) => {
                    should.exist(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('code').eql(200);
                    res.body.should.have.property('message').eql('success');
                    res.body.should.have.property('data');
                    res.body.data.should.have
                        .property('facilityId')
                        .eql(facilityHistory.facilityId.toString());
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('createdAt');
                    res.body.data.should.have.property('updatedAt');
                    done();
                });
        });
    });

    /*
     * Test the /DELETE facility
     */
    describe('/DELETE/facility/delete facility', () => {
        it('it should DELETE a facility', (done) => {
            let facility = new Facility({
                name: 'testFacilityName',
                code: 'testCode',
                type: 'testType'
            });

            let facilityHistory = new FacilityHistory({
                facilityId: facility._id,
                borrowDate: Date.now(),
                returnDate: Date.now()
            });

            let deleteFacility = {
                deleteList: [facilityHistory._id]
            };

            facilityHistory.save((err, facilityHistory) => {
                chai.request(server)
                    .delete('/api/facilityHistory/delete')
                    .send(deleteFacility)
                    .end((err, res) => {
                        should.exist(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('code').eql(200);
                        res.body.should.have.property('message').eql('success');
                        res.body.should.have.property('data');
                        res.body.data.should.have
                            .property('facilityId')
                            .eql(facilityHistory.facilityId.toString());
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('createdAt');
                        res.body.data.should.have.property('updatedAt');
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
