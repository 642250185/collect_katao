const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.card = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    },
    TagID: Number,
    TypeName: String,
    PostageMoney: String,
    ID: Number,
    Title: String,
    TitImg: String,
    USD_Price: String,
    Price: String,
    EffectiveDate: String,
    EffectiveTime: String,
    Column: Number,
    Address: String,
    AuctionCount: Number,
    ByWay: Number,
    Status: Number,
    Bargain: Number,
    SellRealName: String,
    SellMemberID: Number,
    IsGuarantee: Number,
    SellIntegral: Number,
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