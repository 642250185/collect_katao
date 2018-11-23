const {carwlerCategory} = require('../service/category');
const {carwlerProduct} = require('../service/product');
const {carwlerDetail} = require('../service/detail');

const startCrawling = async() => {
    try {
        console.info('开始采集数据');

        await carwlerCategory();

        await carwlerProduct();

        await carwlerDetail();

        console.info('数据采集完成');

        return;
    } catch (e) {
        console.error(e);
        return e;
    }
};


startCrawling();