const { Client } = require('pg');

const CONNECTION = {
  connectionString: 'postgres://qikcrajtvqtplh:ef2c5c733c8669a526c0839aedfaecd73af381940a8888e14d4f094bb6a70553@ec2-44-205-64-253.compute-1.amazonaws.com:5432/d2lvfks79uijoj',
  // ssl: isProduction,
  ssl: { rejectUnauthorized: false },
};

module.exports = {
  async dbQuery(statement, ...parameters) {
    // const client = new Client({ database: 'drop_in' });
    const client = new Client(CONNECTION);
    await client.connect();

    // client.query(statement, parameters)
    //   .then((result) => result)
    //   .catch((err) => console.log(err))
    //   .then(() => client.end());
    try {
      const result = await client.query(statement, parameters);
      return result;
    } catch (err) {
      console.log(err.stack);
    }
    await client.end((err) => {
      console.log('postgres disconnected');
      if (err) {
        console.log('error during disconnection');
      }
    });
  },
};
