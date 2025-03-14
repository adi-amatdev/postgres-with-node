import { Client } from "pg";
import { config } from "dotenv";
config();

const client = new Client({connectionString:`postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@ep-gentle-lake-a1h3md9f-pooler.ap-southeast-1.aws.neon.tech/learnDB?sslmode=require`});


async function createUser() {
    await client.connect();
    const result = await client.query(`
           CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );  
    `);
    console.log("result"+result);
};

// createUser();
async function InsertData(){
    try {
        await client.connect(); // Ensure client connection is established
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
        const res = await client.query(insertQuery);
        console.log('Insertion success:', res); // Output insertion result
      } catch (err) {
        console.error('Error during the insertion:', err);
      } finally {
        await client.end(); // Close the client connection
      }
    
}

// InsertData()

async function getUser() {
    await client.connect();
    try {
        const query = "SELECT * FROM users WHERE email=$1";
        const values = ["user3@example.com"];
        const result = await client.query(query,values);
        console.log(result.rows);

    } catch (error) {
        console.log(error);
    }finally{
        client.end()
    }
};
getUser();