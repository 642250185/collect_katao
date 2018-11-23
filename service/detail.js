require('../schema');
const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const config = require('../config');
const mongoose = require('mongoose');
const request = require('superagent');
const urlencode = require('urlencode');

const {_lag, appName, device, version , token, domain, productDataPath, detailRoute, detailDataPath} = config.katao;

let index = 0;
const getDetail = async(TagID, TypeName, CommodityID, memberid) => {
    try {
        const detailList = [];
        const path = `${domain}${detailRoute}?CommodityID=${CommodityID}&Version=${version}&appname=${appName}&device=${device}&lag=${_lag}&memberid=${memberid}&token=${token}`;
        let detailResult = await request.get(path);
        detailResult = JSON.parse(detailResult.text);
        const {data, msg, result, lag} = detailResult;
        console.info(`${++index}   ${TagID}   ${TypeName}   ${CommodityID}   ${memberid}   ${data.Title}`);
        detailList.push({
            TagID, TypeName,
            ID: data.ID,
            TitImg: data.TitImg,
            Title: data.Title,
            Column: data.Column,
            Price: data.Price,
            USD_Price: data.USD_Price,
            ByWay: data.ByWay,
            Bargain: data.Bargain,
            EffectiveDay: data.EffectiveDay,
            EffectiveTime: data.EffectiveTime,
            EffectiveTimeStr: data.EffectiveTimeStr,
            Detail: data.Detail,
            images: data.images,
            Company: data.Company,
            SellRealName: data.SellRealName,
            Alipay: data.Alipay,
            Address: data.Address,
            IsAttention: data.IsAttention,
            HighestPrice: data.HighestPrice,
            QuantitySold: data.QuantitySold,
            SellUserID: data.SellUserID,
            Postage: data.Postage,
            PostageMoney: data.PostageMoney,
            PriceCount: data.PriceCount,
            AuctionCount: data.AuctionCount,
            integral: data.integral,
            IsGuarantee: data.IsGuarantee,
            IsActivity: data.IsActivity,
            CurrentDate: data.CurrentDate,
            Category: data.Category,
            LastOnTime: data.LastOnTime,
            AddressVersionCode: data.AddressVersionCode,
            HPrice: data.HPrice,
            LPrice: data.LPrice,
            ReleaseType: data.ReleaseType,
            NewPostageMoney: data.NewPostageMoney,
            SellerWyAccId: data.SellerWyAccId
        });
        return detailList;
    } catch (e) {
        console.error(e);
        return [];
    }
};


const getAllDetail = async() => {
    try {
        let final = [], index = 0;
        // const products = JSON.parse(fs.readFileSync(productDataPath));
        const products = await $card.find({});
        console.info('producnts.size: ', products.length);
        for(let product of products){
            ++index;
            const {TagID, TypeName, ID, SellMemberID} = product;
            const plist = await getDetail(TagID, TypeName, ID, SellMemberID);
            final = final.concat(plist);
        }
        return final;
    } catch (e) {
        console.error(e);
        return [];
    }
};


const carwlerDetail = async() => {
    try {
        console.info(`开始采集卡片详情数据......`);
        const p_detail_list = await getAllDetail();
        console.info('p_detail_list.Size: ', p_detail_list.length);
        await fs.ensureDir(path.join(detailDataPath, '..'));
        fs.writeFileSync(detailDataPath, JSON.stringify(p_detail_list, null, 4));
        for(let pd of p_detail_list){
            pd._id = new mongoose.Types.ObjectId;
            await new $cardDetail(pd).save();
        }
        return p_detail_list;
    } catch (e) {
        console.error(e);
        return [];
    }
};


exports.carwlerDetail = carwlerDetail;