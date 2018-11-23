const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.cardDetail = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    },
    TagID: Number,
    TypeName: String,
    ID: Number,
    TitImg: String,
    Title: String,
    Column: Number,
    Price: String,
    USD_Price: String,
    ByWay: Number,
    Bargain: Number,
    EffectiveDay: Number,
    EffectiveTime: String,
    EffectiveTimeStr: String,
    Detail: String,
    images: String,
    Company: Number,
    SellRealName: String,
    Alipay: String,
    Address: String,
    IsAttention: Number,
    HighestPrice: Number,
    QuantitySold: Number,
    SellUserID: Number,
    Postage: Number,
    PostageMoney: Number,
    PriceCount: Number,
    AuctionCount: Number,
    integral: Number,
    IsGuarantee: Number,
    IsActivity: Boolean,
    CurrentDate: String,
    Category: Number,
    LastOnTime: String,
    AddressVersionCode: String,
    HPrice: Number,
    LPrice: Number,
    ReleaseType: Number,
    NewPostageMoney: String,
    SellerWyAccId: String,
    createTime: {
        type: Date,
        default: Date.now,
        index: true
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false,
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
});