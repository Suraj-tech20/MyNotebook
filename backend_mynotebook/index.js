require('dotenv').config();
const express = require('express'),
    cors = require('cors');
// cookieparser = require('cookie-parser');
const connnetToMongodb = require('./db');
connnetToMongodb();
const app = express();
const port = process.env.PORT || 5000;

// If you want to use req.body you should use this line
app.use(express.json());
// Line to get fatch from frontend
app.use(cors());
// app.use(cookieparser());

// Routes
app.use('/auth', require('./routers/auth'));
app.use('/notes', require('./routers/notes'));

app.listen(port, () => {
    console.log("hi I am listening at http://localhost:" + port);
});