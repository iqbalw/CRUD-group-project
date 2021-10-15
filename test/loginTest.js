// Set Node environment for testing
process.env.NODE_ENV = 'test'; 

const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('../server');
const app = require('../server');
const database = require('../startup/database');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Login GET /auth/login', () => {

    it("It should Get the login page", (done) => {
        chai.request(app)
        .get('/auth/login') // Login page
        .end((err, response) => {
            response.should.have.status(200);
            response.should.have.property('ok').equal(true);
            response.should.have.property('text');
            done();
        });
    });

    it('It should return Bad Request error', (done) => {
        chai.request(app)
            .get('/auth/wrongLogin')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.equal('Sorry, Request Not found.');
                done();
            });
    });
});

describe('Invlaid Login POST /auth/login', () => {

    it('It should redirect to ./failure', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "test@mail.com",
                password: "password"
            })
            .redirects(0)
            .end((err, res) => {
                res.should.have.status(302);
                res.header.should.have.property('location').equal('./failure');
                res.should.have.property('text').equal('Found. Redirecting to ./failure');
                done();
            });
    });

    it('It should redirect to ./login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .send({
                email: "test@mail.com",
                password: "password"
            })
            .redirects(1)
            .end((err, res) => {
                res.should.have.status(302);
                res.header.should.have.property('location').equal('./login');
                res.should.have.property('text');
                done();
            });
    });
})

describe('Valid Login POST /auth/login', () => {

    const data = {
        name: "Test User",
        email: "test@mail.com",
        password: "password"
    }

    // Register User
    before((done) => {
        chai.request(app)
            .post('/auth/register')
            .send(data)
            .end((err, res) => {
                done();
            });
    });

    it('It should allow login attempt', (done) => {
        chai.request.agent(app)
            .post('/auth/login')
            .send({
                email: data.email,
                password: data.password
            })
            .redirects(0)
            .end((err, res) => {
                res.should.have.status(302);
                res.header.should.have.property('location').equal('/');
                res.should.have.cookie('connect.sid');
                done();
            });
    });

})

describe('Check Session cookies', () => {

    
    let agent = chai.request.agent(app);

    const data = {
        name: "Test User",
        email: "test@mail.com",
        password: "password"
    }

    let cookie;

    // Register
    before((done) => {
        agent
            .post('/auth/register')
            .send({ data })
            .end((err, res) => {
                //console.log(res);
                done();
            });
    });

    it('Should Login and have a session cookie saved', (done) => {
        agent
            .post('/auth/login')
            .send({ data })
            .end((err, res) => {
                //console.log(res);
                res.should.have.cookie('connect.sid');
                done();
            });
    });

    it('Should Logout and remove the session cookie', (done) => {
        agent
            .get('/auth/logout')
            .send({ data })
            .end((err, res) => {
                res.should.not.have.cookie('connect.sid')
                done();
            });
    });
});

