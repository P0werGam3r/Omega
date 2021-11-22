const express = require('express');
const app = express();
const config = require("./configs/config.json");


const session = require('express-session');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('static'));
app.use(session({
    secret: '48738924783748273742398747238',
    resave: false,
    saveUninitialized: false,
    expires: 300000,
}));
require('./router')(app);

const port = config.dashboard_port;
app.listen(port, () => console.info(`[LOG] Listening on port ${port}`));