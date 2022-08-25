const { Client } = require('pg');

const CONNECTION = {
  connectionString: 'postgres://qikcrajtvqtplh:ef2c5c733c8669a526c0839aedfaecd73af381940a8888e14d4f094bb6a70553@ec2-44-205-64-253.compute-1.amazonaws.com:5432/d2lvfks79uijoj',
  // ssl: isProduction,
  ssl: { rejectUnauthorized: false },
};

module.exports = {
  async dbQuery(statement) {
    const client = new Client({ database: 'drop_in' });
    // const client = new Client(CONNECTION);
    await client.connect();
    try {
      return await client.query(statement);
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.end();
    }
    await client.end();
  },
};
