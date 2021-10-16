// Set Node environment for testing
process.env.NODE_ENV = 'test'; 

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const database = require('../startup/database');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Register Test Failing due to adding email twice", () => {
    it("Adding a user normally", (done) => {
      const data = {
        name: "Register User",
        email: "test123@mail.com",
        password: "password123",
      };
      chai
        .request(app)
        .post("/auth/register")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });

    });
  
    it("It should fail due to email already used", (done) => {
      const data = {
        name: "Register User",
        email: "test123@mail.com",
        password: "password123@",
      };
      chai
        .request(app)
        .post("/auth/register")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400); //we already have this email in the db
          done();
        });
    });



  });

  describe("Test fails as going to invalid route", () => {
    it("Adding a user normally", (done) => {
      const data = {
        name: "Register User",
        email: "test123@mail.com",
        password: "password123",
      };
      chai
        .request(app)
        .post("/auth/aaa")
        .send(data)
        .end((err, res) => {
          res.should.have.status(404); //invalid route access
          done();
        });
    });

});


describe("Tests fail as we are not authenticated", () => {
    it("Going to the", (done) => {
      chai
        .request(app)
        .post("/cart")
        .end((err, res) => {
          res.should.have.status(404); //invalid route access
          done();
        });
    });

    after((done) => {
        database.dropCollection('sessions');
        done();
    });

});


