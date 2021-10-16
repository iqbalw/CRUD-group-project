// Set Node environment for testing
process.env.NODE_ENV = 'test'; 

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const database = require('../startup/database');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Product page GET request', () => {

    it("It should pass the test", (done) => {
        chai.request(app)
        .get('/') // Index page
        .end((err, response) => {
            response.should.have.status(200);
            done();
        });
    });
});


describe('Adding a product', () => {
    it("It should pass the test", (done) => {
        const data = {
            name: "Test Shoe",
            description: "please pass",
            price: 30,
        };

        chai.request(app)
        .post('/products/add') // Index page
        .send(data)
        .end((err, response) => {
            response.should.have.status(200);
            done();
        });
    });

    after((done) => {
        database.dropCollection('sessions');
        done();
    });
});

