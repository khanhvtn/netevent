let mongoose = require("mongoose");

let User = require('../models/userModel');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

// you can use a global variable if tests span many files
let currentResponse = null;

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
            done();
        });
    });

    /*
      * Test the /GET user
      */
    describe('/GET/user/filter user', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/api/user/filter')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    /*
      * Test the /POST user
      */
    // describe('/POST/user/create user', () => {
    //     it('it should POST a user', (done) => {
    //         let user = {
    //             email: "test@gmail.com",
    //             role: ['1'],
    //         }
    //         chai.request(server)
    //             .post('/api/user/create')
    //             .send(user)
    //             .end((err, res) => {

    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('code').eql(200);
    //                 res.body.should.have.property('message').eql('success');
    //                 res.body.should.have.property('data');
    //                 res.body.data.should.have.deep.property('role').eql(user.role);
    //                 res.body.data.should.have.deep.property('isConfirmed').eql(false);
    //                 res.body.data.should.have.deep.property('_id');
    //                 res.body.data.should.have.deep.property('email').eql(user.email);
    //                 res.body.data.should.have.deep.property('createdAt');
    //                 res.body.data.should.have.deep.property('updatedAt');
    //                 done();
    //             });
    //     });
    // });

    /*
      * Test the /PATCH user
      */
    describe('/PUT/user/update user', () => {
        it('it should UPDATE a user', (done) => {
            let user = new User({ email: "test@gmail.com", role: ['1'] })
            let updateUser = {
                filter: user.email,
                update: {
                    email: user.email,
                    role: ['1', '2', '3', '4']
                }
            }
            user.save((err, user) => {
                chai.request(server)
                    .patch('/api/user/update')
                    .send(updateUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('code').eql(200);
                        res.body.should.have.property('message').eql('success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('role').eql(updateUser.update.role);
                        res.body.data.should.have.property('isConfirmed').eql(false);
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('email').eql(updateUser.update.email);
                        res.body.data.should.have.property('createdAt');
                        res.body.data.should.have.property('updatedAt');
                        done();
                    });
            });
        });
    });

    /*
     * Test the /DELETE user
     */
    describe('/DELETE/user/delete user', () => {
        it('it should DELETE a user', (done) => {
            let user = new User({ email: "test@gmail.com", role: ['1'] })
            let deleteUser = {
                deleteList: ["test@gmail.com"]
            }
            user.save((err, user) => {
                chai.request(server)
                    .delete('/api/user/delete')
                    .send(deleteUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('code').eql(200);
                        res.body.should.have.property('message').eql('success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('role').eql(user.role);
                        res.body.data.should.have.property('isConfirmed').eql(false);
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('email').eql(user.email);
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