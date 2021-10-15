// Set Node environment for testing
process.env.NODE_ENV = 'test'; 

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const database = require('../startup/database');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Login Example test GET /', () => {

    it("It should pass the test", (done) => {
        chai.request(app)
        .get('/') // Index page
        .end((err, response) => {
            response.should.have.status(200);
            done();
        });
    });
});