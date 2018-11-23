const _path = require('path');

const config = {
    mongodb: {
        host: '127.0.0.1',
        port: 27017,
        dbname: 'kaTao',
    },
    katao: {
        version: 96,
        device: 'IPH',
        _lag: 'zh-Hans',
        appName: 'Card',
        domain: 'http://api.54katao.com',
        categoryRoute: '/Commodity/GetTigsV1',
        productRoute: '/Commodity/IndexV1/',
        detailRoute: '/Commodity/DetailCommodity',
        token: '350E6436-8A02-4683-9697-8AAD368B1D91',

        categoryDataPath: _path.join(__dirname, '..', 'data/category.json'),
        productDataPath: _path.join(__dirname, '..', 'data/product.json'),
        detailDataPath: _path.join(__dirname, '..', 'data/detailData.json')
    },
    env: function () {
        global.$config = this;
        return global.$config;
    }
};


module.exports = config.env();