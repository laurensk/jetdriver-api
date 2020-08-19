'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const { v4: uuidv4 } = require('uuid');
const Companion = require('../../models/Companion.model');