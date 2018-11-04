const cheerio = require('cheerio');
const config = require('../config');
const request = require('superagent');

const {domain} = config.katao;

const getBrand = async() => {
    try {
        const final = [];
        const path = `${domain}`;
        let result = await request.get(path);
        const $ = cheerio.load(result.text, {decodeEntities: false});
        $('.dropdown').find('li').each(function () {
            let url = $(this).find('a').attr('href');
            url = `${domain}${url}`;
            const categroy = $(this).find('a').text().trim();
            console.info(`分类: ${categroy}、 分类链接: ${domain}${url}`);
            final.push({categroy, url});
        });
        return final;
    } catch (e) {
        console.error(e);
        return [];
    }
};

const getDetail = async(categroy, url) => {
    try {
        let result = await request.get(url);
        const $ = cheerio.load(result.text, {decodeEntities: false});
        const len = $('.col-xs-10').children().length;
        console.info('len: ', len);
        let index = 0;
        const arr = [0,1,2];
        for(let i = 0; i < len; i++){
            ++index;
            if(arr.includes(index)){
                continue;
            }
            const div = $('.col-xs-10').children().eq(i);
            const imgSrc = div.find('.col-xs-3').find('img').attr('src');
            const imgAlt = div.find('.col-xs-3').find('img').attr('alt');
            console.info(`${imgAlt}  ${imgSrc}`);

        }
    } catch (e) {
        console.error(e);
        return [];
    }
};

const getAllDetail = async() => {
    try {
        const brands = await getBrand();
        console.info('size: %d', brands.length);
        for(let brand of brands){
            const {categroy, url} = brand;
            await getDetail(categroy, url);
            break;
        }
    } catch (e) {
        console.error(e);
        return e;
    }
};


getAllDetail();