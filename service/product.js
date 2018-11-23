require('../schema');
const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const config = require('../config');
const mongoose = require('mongoose');
const request = require('superagent');
const urlencode = require('urlencode');

const {_lag, appName, device, version , token, domain, productRoute, categoryDataPath, productDataPath} = config.katao;

let index = 0;
const getProduct = async(category, pageIndex, plist) => {
    try {
        ++index;
        if(_.isEmpty(plist)){
            pageIndex = 1;
            plist = [];
        }
        let pageDataList = []; const pageSize = 10;
        let search = `[{"TagID":"${category.TagID}","FieldName":"${category.FieldName}","TypeName":"${category.TypeName}"},{"TagID":"1","FieldName":"Status","TypeName":"Selling"}]`;
        search = urlencode(search);
        const path = `${domain}${productRoute}?device=${device}&search=${search}&pageSize=${pageSize}&Version=${version}&title=&orderbytype=1&appname=${appName}&lag=${_lag}&pageIndex=${pageIndex}&token=${token}`;
        let productResult = await request.get(path);
        productResult = JSON.parse(productResult.text);
        const {data, msg, result, lag} = productResult;
        console.info(`index: ${index}   TagID: ${category.TagID}   TypeName: ${category.TypeName}   pageIndex: ${pageIndex}    data.Size: ${data.length}`);
        for(const item of data){
            pageDataList.push({
                TagID: category.TagID,
                TypeName: category.TypeName,
                PostageMoney: item.PostageMoney,
                ID: item.ID,
                Title: item.Title,
                TitImg: item.TitImg,
                USD_Price: item.USD_Price,
                Price: item.Price,
                EffectiveDate: item.EffectiveDate,
                EffectiveTime: item.EffectiveTime,
                Column: item.Column,
                Address: item.Address,
                AuctionCount: item.AuctionCount,
                ByWay: item.ByWay,
                Status: item.Status,
                Bargain: item.Bargain,
                SellRealName: item.SellRealName,
                SellMemberID: item.SellMemberID,
                IsGuarantee: item.IsGuarantee,
                SellIntegral: item.SellIntegral
            });
        }
        if(data.length === pageSize){
            plist = plist.concat(pageDataList);
            pageIndex++;
            return await getProduct(category, pageIndex, plist);
        } else if(data.length !== 0 && data.length < pageSize) {
            plist = plist.concat(pageDataList);
            return plist;
        }
    } catch (e) {
        console.error(e);
        return e;
    }
};


const getAllProduct = async() => {
    try {
        let plist = [], index = 0;
        const categorys = JSON.parse(fs.readFileSync(categoryDataPath));
        for(let category of categorys){
            const clist = await getProduct(category);
            plist = plist.concat(clist);
        }
        return plist;
    } catch (e) {
        console.error(e);
        return e;
    }
};

const carwlerProduct = async() => {
    try {
        console.info(`开始采集卡片......`);
        const plist = await getAllProduct();
        console.info('卡片总数: ', plist.length);
        await fs.ensureDir(path.join(productDataPath, '..'));
        fs.writeFileSync(productDataPath, JSON.stringify(plist, null, 4));
        for(let p of plist){
            p._id = new mongoose.Types.ObjectId;
            await new $card(p).save();
        }
        return plist;
    } catch (e) {
        console.error(e);
        return e;
    }
};


exports.carwlerProduct = carwlerProduct;