const pool = require("../db/pool");

exports.fetchAllUsers = async () => {
  console.log('---in userModel fetchAllUsers---');
  const selectSql = `SELECT "firstName", "lastName", "email" FROM "users"`;
  const queryResult = await pool.query(selectSql);
  console.log('---after query---');
  return queryResult.rows;
};