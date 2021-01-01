/**
 * @file JurrieWeb.js
 */

const express = require('express');
const app = express();
const fetch = require('node-fetch');
const { version } = require('discord.js')
class CubeCraftWeb {

    constructor(port) {
        this.port = port;
    }

    connect() {
        app.enable('trust proxy');

        app.get('/', (req, res) => {
            res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

        });

        app.get('/api', (req, res) => {
            res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        });

        app.get('/api/status', (req, res) => {
            res.json({
                status_discord: 'Online',
            });
        });

        app.get(`/api/id/married`)

        app.listen(this.port, () => {
            console.log(`Express - Listening to ${this.port}`);
        })
    }
}

module.exports = { CubeCraftWeb };