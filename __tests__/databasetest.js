const dotenv = require('dotenv');
dotenv.config();

const { Pool } = require('pg');

//beforeall (make sure we start with a blank database)

xdescribe ('db unit tests', () => {

    let pool = new Pool({ connectionString: process.env.DB_URI });
    let createTableSQL =
    "DROP TABLE testclient;CREATE TABLE testclient(_id  SERIAL PRIMARY KEY, username  VARCHAR(100) NOT NULL, userpassword VARCHAR NOT NULL);";
      //drop any table called testclient (may not need to do this)
      //create a table called testclient


    beforeAll(async () => {
      await pool.query(createTableSQL);
    })

    //after all (make sure we clear our test results)
    afterAll(async () => {
        //drop testclient table
        let dropTableSQL = "DROP TABLE IF EXISTS `testclient`";
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
  
        const [rows, fields] = await connection.query("SELECT * FROM testclient");
  
        expect(rows.length).toBe(1);
      } catch (error) {
        console.log(error);
        let dropTableSQL = "DROP TABLE IF EXISTS `testclient`";
        await connection.query(dropTableSQL);
        await connection.end();
      }
    }, 60000);
    
})




