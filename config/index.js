const _path = require('path');

const config = {
    katao: {
        domain: 'http://www.54katao.com',
    },
    env: function () {
        global.$config = this;
        return global.$config;
    }
};


module.exports = config.env();