const path = require('path');
const fs = require('fs-extra');
const config = require('../config');
const request = require('superagent');

const {_lag, appName, device, version , token, domain, categoryRoute, categoryDataPath} = config.katao;

const getCategory = async() => {
    try {
        let type = 0, categoryList = [];
        const link = `${domain}${categoryRoute}?Type=${type}&Version=${version}&appname=${appName}&device=${device}&lag=${_lag}&token=${token}`;
        let categoryResult = await request.get(link);
        categoryResult = JSON.parse(categoryResult.text);
        const {data, msg, result, lag} = categoryResult;
        for(let item of data){
            const {TagID, FieldName, TypeName} = item;
            categoryList.push({TagID, FieldName, TypeName});
            console.info(`${TagID}  ${FieldName}  ${TypeName}`);
        }
        return categoryList;
    } catch (e) {
        console.error(e);
        return [];
    }
};


const carwlerCategory = async() => {
    try {
        console.info(`开始采集分类......`);
        const categorys = await getCategory();
        console.info(`分类总数:`, categorys.length);
        await fs.ensureDir(path.join(categoryDataPath, '..'));
        fs.writeFileSync(categoryDataPath, JSON.stringify(categorys, null, 4));
        return categorys;
    } catch (e) {
        console.error(e);
        return [];
    }
};


exports.carwlerCategory = carwlerCategory;