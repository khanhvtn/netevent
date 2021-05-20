let mongoose = require("mongoose");

let Facility = require('../models/facilityModel');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

// you can use a global variable if tests span many files
let currentResponse = null;

chai.use(chaiHttp);
//Our parent block
describe('Facilities', () => {
    beforeEach((done) => { //Before each test we empty the database
        Facility.remove({}, (err) => {
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

                    res.should.have.status(500);
                    res.body.should.be.a('object');
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
                name: "testFacility", 
                code: "testCode", 
                type: "testType"
            }
            chai.request(server)
                .post('/api/facility/create')
                .send(facility)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('code').eql(200);
                    res.body.should.have.property('message').eql('success');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('name').eql(facility.name);
                    res.body.data.should.have.property('code').eql(facility.code);
                    res.body.data.should.have.property('type').eql(facility.type);
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
            let facility = new Facility({ name: "testFacility", code: "testCode", type: "testType" })
            let updateFacility = {
                filter: facility.name,
                update: {
                    name: "newFacilityTest",
                    code: "newCodeTest",
                    type: "newTypeTest"
                }
            }
            facility.save((err, facility) => {
                chai.request(server)
                    .patch('/api/facility/update')
                    .send(updateFacility)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('code').eql(200);
                        res.body.should.have.property('message').eql('success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('name').eql(updateFacility.update.name);
                        res.body.data.should.have.property('code').eql(updateFacility.update.code);
                        res.body.data.should.have.property('type').eql(updateFacility.update.type);
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
            let facility = new Facility({ name: "testFacility", code: "testCode", type: "testType" })
            let deleteFacility = {
                deleteList: ["testFacility"]
            }
            facility.save((err, facility) => {
                chai.request(server)
                    .delete('/api/facility/delete')
                    .send(deleteFacility)
                    .end((err, res) => {
                        currentResponse = res; // update it here

                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('code').eql(200);
                        res.body.should.have.property('message').eql('success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('name').eql(facility.name);
                        res.body.data.should.have.property('code').eql(facility.code);
                        res.body.data.should.have.property('type').eql(facility.type);
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('status').eql(true);
                        res.body.data.should.have.property('createdAt');
                        res.body.data.should.have.property('updatedAt');
                        done();
                    });
            });
        });
    });

    afterEach(function () {
        const errorBody = currentResponse && currentResponse.body;

        if (this.currentTest.state === 'failed' && errorBody) {
            console.log("This is a response: ", errorBody);
        }

        currentResponse = null;


    });

});