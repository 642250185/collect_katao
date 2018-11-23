const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbname}`);
mongoose.Promise = global.Promise;
global.$mongoose = mongoose;

/**
 * 设置数据源
 */
const syncDB = () => {
    const {card} = require('../model/card');
    const {cardDetail} = require('../model/cardDetail');
    global['$card'] = mongoose.model('card', card, 'card');
    global['$cardDetail'] = mongoose.model('cardDetail', cardDetail, 'cardDetail');
};

syncDB();