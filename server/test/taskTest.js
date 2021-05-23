const Task = require('../models/taskModel');
const User = require('../models/userModel');
const Event = require('../models/eventModel');
const mongoose = require('mongoose');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

/**
 *  =====================================
 *              TASK TESTING
 *  =====================================
 */

// you can use a global variable if tests span many files
let currentResponse = null;

chai.use(chaiHttp);

//Testing block for task
describe('Tasks', () => {
    beforeEach((done) => { //Before each test we empty the database
        Task.remove({}, (err) => {
            done();
        });
    });

    /*
      * Test the /GET task
      */
    describe('/GET/task/filter task', () => {
        it('it should GET all the tasks', (done) => {
            chai.request(server)
                .get('/api/task/filter')
                .end((err, res) => {

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
      * Test the /POST task
      */
    describe('/POST/task/create task', () => {
        it('it should POST a task', (done) => {
            let event = new Event({ eventName: 'testEventName', language: 'testLanguage', mode: 'testMode' })
            let user = new User({ email: 'test@gmail.com', role: ['1'] })
            let task = new Task({
                name: 'testTaskName',
                type: 'testTaskType',
                startDate: Date.now(),
                endDate: Date.now(),
                userId: user._id,
                eventId: event._id
            })

            chai.request(server)
                .post('/api/task/create')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('code').eql(200);
                    res.body.should.have.property('message').eql('success');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('name').eql(task.name);
                    res.body.data.should.have.property('type').eql(task.type);
                    res.body.data.should.have.property('userId').eql(task.userId.toString());
                    res.body.data.should.have.property('eventId').eql(task.eventId.toString());
                    res.body.data.should.have.property('_id');
                    res.body.data.should.have.property('createdAt');
                    res.body.data.should.have.property('updatedAt');
                    done();
                });
        });
    });

    /*
      * Test the /PATCH task
      */
    describe('/PUT/task/update task', () => {
        it('it should UPDATE a task', (done) => {
            let event = new Event({ eventName: 'testEventName', language: 'testLanguage', mode: 'testMode' })
            let user = new User({ email: 'test@gmail.com', role: ['1'] })
            let task = new Task({
                name: 'testTaskName',
                type: 'testTaskType',
                startDate: Date.now(),
                endDate: Date.now(),
                userId: user._id,
                eventId: event._id
            })
            let updateTask = {
                filter: task._id,
                update: {
                    name: 'newTaskTestName',
                    type: 'newTaskType'
                }
            }
            task.save((err, task) => {
                chai.request(server)
                    .patch('/api/task/update')
                    .send(updateTask)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('code').eql(200);
                        res.body.should.have.property('message').eql('success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('name').eql(updateTask.update.name);
                        res.body.data.should.have.property('type').eql(updateTask.update.type);
                        res.body.data.should.have.property('userId').eql(task.userId.toString());
                        res.body.data.should.have.property('eventId').eql(task.eventId.toString());
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('createdAt');
                        res.body.data.should.have.property('updatedAt');
                        done();
                    });
            });
        });
    });

    /*
     * Test the /DELETE task
     */
    describe('/DELETE/task/delete task', () => {
        it('it should DELETE a task', (done) => {
            let event = new Event({ eventName: 'testEventName', language: 'testLanguage', mode: 'testMode' });
            let user = new User({ email: 'test@gmail.com', role: ['1'] });
            let task = new Task({
                name: 'testTaskName',
                type: 'testTaskType',
                startDate: Date.now(),
                endDate: Date.now(),
                userId: user._id,
                eventId: event._id
            });
            let deleteTask = {
                deleteList: [task._id]
            };
            task.save((err, task) => {
                chai.request(server)
                    .delete('/api/task/delete')
                    .send(deleteTask)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('code').eql(200);
                        res.body.should.have.property('message').eql('success');
                        res.body.should.have.property('data');
                        res.body.data.should.have.property('name').eql(task.name);
                        res.body.data.should.have.property('type').eql(task.type);
                        res.body.data.should.have.property('userId').eql(task.userId.toString());
                        res.body.data.should.have.property('eventId').eql(task.eventId.toString());
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