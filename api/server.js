const express = require("express");
const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors({
    origin: ['https://amelieroussin.ca', 'https://www.amelieroussin.ca']
}));

app.use(express.json());

const userRoutes = require('./routers/userRoutes');
app.use('/users', userRoutes);

const heartbeatRoutes = require('./routers/heartbeatRoutes');
app.use('/heartbeat', heartbeatRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});