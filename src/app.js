'use strict';

const express = require('express');
require('dotenv/config');

const app = express();
const router = require('./router');

app.use(express.json());
app.disable('x-powered-by');

app.use(router);

app.listen(process.env.APP_PORT || 3000);