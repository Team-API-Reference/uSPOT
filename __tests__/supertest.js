
const request = require("supertest");
const db = require("../server/models/userModel.js");
//import the spotify records model here

const server = "http://localhost:3000";
const queryResetDB =
`DROP TABLE records, users; 
CREATE TABLE users(
  username  VARCHAR(100) PRIMARY KEY,
  passcode  VARCHAR(100) NOT NULL,
  session_id uuid
); 
  CREATE TABLE records(
    youtubeurl  VARCHAR(100) PRIMARY KEY,
    spotifyid  VARCHAR(100) NOT NULL,
    username VARCHAR(100) REFERENCES users (username)
  );`;
/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */



describe("Route integration", () => {
  beforeAll((done) => {
    db.query(queryResetDB);
    done();
  });

  describe("/", () => {
    describe("GET", () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it("responds with 200 status and text/html content type", () => {
        return request(server)
          .get("/")
          .expect("Content-Type", /text\/html/)
          .expect(200);
      });
    });
  });


  //post test goes here
  describe("/api/signup", () => {
    describe("POST", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .post("/api/signup")
          .send({username: "Regis2", passwordUser: "tarotcards"})
          .expect(200);
      });

      it('parses an object from the response to signup', () => {
        return request(server)
          .post("/api/signup")
          .send({username: "Regis3", passwordUser: "tarotcards"})
          .expect(200)
          .then((res) => {
            expect(typeof res.body).toEqual("object"); //update when we implement signup
          });
      });
    });
  });

  describe("/api/login", () => {
    describe("POST", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .post("/api/login")
          .send({username: "Regis2", passwordUser: "tarotcards"})
          // .expect("Content-Type", /json/)
          .expect(200);
      });

      it('parses an object from the response to login', () => {
        return request(server)
          .post("/api/login")
          .send({username: "Regis3", passwordUser: "tarotcards"})
          // .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(typeof res.body).toEqual("object");
            //{ userExists: false, userAdded: false, userID: null }
            expect(res.body).toHaveProperty('userExists');
            expect(res.body).toHaveProperty('userAdded');
            // expect(res.body).toHaveProperty('userID');
          });
      });
    });
  });

  //post test goes here
  describe("/api/addEntry", () => {
    describe("POST", () => {
      it("responds with 200 status and application/json content type", () => {
        return request(server)
          .post("/api/addEntry")
          .query({urlEntry: "www.hackme.com", userID: 2, passwordEntry: "hunter2"})
          .expect(200);
      });

      it('parses an array from the response to login', () => {
        return request(server)
          .post("/api/addEntry")
          .query({urlEntry: "www.hackme.com", userID: 2, passwordEntry: "hunter2"})
        //   .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(Array.isArray(res.body)).toEqual(true);
          });
      });
    });
  });

  //plan for get and update and delete later
});