const pool = require('../db/pool');

exports.fetchHeartBeat = async () => {
  try {
    await pool.query('SELECT 1'); // Sert à tester la connexion à la base de données
    return { errorCode: 0, message: 'Success' };
  } catch (err) {
    return { errorCode: 1, message: 'DB not reachable' };
  }
};