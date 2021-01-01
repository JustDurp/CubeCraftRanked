/**
 * @file app.js
 */

const { config } = require('dotenv');
const { CubecraftClient } = require('./domain/ccr');
const { CubeCraftWeb } = require('./domain/ccw');
const { MySQL } = require('./api/Connection')

config({ path: '.env' });


new CubecraftClient(process.env.token).start();
new CubeCraftWeb(444).connect();
module.exports.con = new MySQL(process.env.host, process.env.user, process.env.password).connect(process.env.database)
