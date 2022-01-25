
const request = require("supertest");
const db = require("../server/models/userModel.js");
//import the spotify records model here

const server = "http://localhost:3000";
const queryResetDB =
`DROP TABLE entry, users; 
CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY, 
  username VARCHAR UNIQUE, 
  passcode VARCHAR, 
  session_id uuid); 
CREATE TABLE entry (
  id SERIAL NOT NULL,  
  url VARCHAR,
  user_id INT REFERENCES users,
  entry_password VARCHAR
);`;
/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */



xdescribe("Route integration", () => {
  beforeAll((done) => {
    db.query(queryResetDB);
    done();
  });

  xdescribe("/", () => {
    xdescribe("GET", () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      xit("responds with 200 status and text/html content type", () => {
        return request(server)
          .get("/")
          .expect("Content-Type", /text\/html/)
          .expect(200);
      });
    });
  });

  //test the route, then check the json object on the response
  xdescribe("/api/getAllEntries", () => {
    xdescribe("GET", () => {
      xit("responds with 200 status and application/json content type", () => {
        return request(server)
          .get("/api/getAllEntries")
          .query({userID: 1})
          .expect("Content-Type", /json/)
          .expect(200);
      });

      xit('parses an array from the response to getAllEntries', () => {
        return request(server)
          .get("/api/getAllEntries")
          .query({userID: 1})
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(Array.isArray(res.body)).toEqual(true);
          });
      });
    });
  });

  //post test goes here
  xdescribe("/api/signup", () => {
    xdescribe("POST", () => {
      xit("responds with 200 status and application/json content type", () => {
        return request(server)
          .post("/api/signup")
          .send({username: "Regis2", passwordUser: "tarotcards"})
          .expect(200);
      });

      xit('parses an object from the response to signup', () => {
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

  xdescribe("/api/login", () => {
    xdescribe("POST", () => {
      xit("responds with 200 status and application/json content type", () => {
        return request(server)
          .post("/api/login")
          .send({username: "Regis2", passwordUser: "tarotcards"})
          // .expect("Content-Type", /json/)
          .expect(200);
      });

      xit('parses an object from the response to login', () => {
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
  xdescribe("/api/addEntry", () => {
    xdescribe("POST", () => {
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