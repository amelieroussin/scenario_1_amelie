const heartbeatModel = require('../models/heartbeatModel');
const UNKNOWN_ERROR = {
    message: "Unknown error",
    errorCode: 9999
};

exports.getHeartbeat = async (req, res) => {
    let result = UNKNOWN_ERROR;
    const heartbeat = await heartbeatModel.fetchHeartBeat();

    if (heartbeat.errorCode === 0) {
        result = {
            message: "Success",
            errorCode: 0
        };
        console.log('---in heartbeatController getHeartbeat---', heartbeat);
    }
    res.json(result);
};