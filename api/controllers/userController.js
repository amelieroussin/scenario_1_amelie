const userModel = require('../models/userModel');
const UNKNOWN_ERROR = {
        message: "Unknown error",
        errorCode: 9999
};

exports.getUsers = async (req, res) => {
    let result = UNKNOWN_ERROR;
    console.log('---in userController getUsers---');
    
    try {
      const users = await userModel.fetchAllUsers();
      console.log('---after model fetchAllUsers---');
      
      result = {
          message: 'Success',
          errorCode: 0,
          rows: users
      };
      console.log(users);
      res.json(result);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
          message: 'Erreur serveur',
          errorCode: 1001
      });
    }
};