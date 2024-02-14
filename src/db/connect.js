const Pool = require('pg').Pool;

const connection = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectDB = async () => {
  await connection.connect();
};

module.exports = { connectDB, connection };
