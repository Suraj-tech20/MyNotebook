const express = require('express'),
    cors = require('cors');
const connnetToMongodb = require('./db');
connnetToMongodb();
const app = express();
const port = 5000;

// If you want to use req.body you should use this line
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', require('./routers/auth'));
app.use('/notes', require('./routers/notes'));

app.listen(port, () => {
    console.log("hi I am listening at http://localhost:" + port);
});