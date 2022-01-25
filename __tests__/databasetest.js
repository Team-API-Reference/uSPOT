const dotenv = require('dotenv');
dotenv.config();

const { Pool } = require('pg');
const PostgresDriver = require('../postgresDriver');

//beforeall (make sure we start with a blank database)

describe ('db unit tests', () => {

    let pool;
    beforeAll(async (done) => {
        
      let createTableSQL =
      "DROP TABLE testClient;CREATE TABLE testClient(_id  SERIAL PRIMARY KEY, username  VARCHAR(100) NOT NULL, userpassword VARCHAR NOT NULL);";
        pool = new Pool({ connectionString: process.env.DB_URI });
        //drop any table called testClient (may not need to do this)
        //create a table called testClient
        await pool.query(createTableSQL);
    })

    //after all (make sure we clear our test results)
    afterAll(async (done) => {
        //drop testClient table
        let dropTableSQL = "DROP TABLE IF EXISTS `testClient`";
        await pool.query(dropTableSQL);
        pool.close();
    })

  //basic database functionality
//add something to it
//find something in it
    it("Test CREATE and READ", async () => {
      try {
        let insertSQL = `INSERT INTO testclient (id, username, userpassword) VALUES (0, 'testboy', 'testboypassword');`;
        await pool.query(insertSQL);
  
        const [rows, fields] = await connection.query("SELECT * FROM testClient");
  
        expect(rows.length).toBe(1);
      } catch (error) {
        console.log(error);
        let dropTableSQL = "DROP TABLE IF EXISTS `testClient`";
        await connection.query(dropTableSQL);
        await connection.end();
      }
    }, 60000);
    
})




