const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    offerId:{
        type: String,
        required: true
    },
    offerTitle:{
        type: String,
        required: true
    },
    offerDescription:{
        type: String,
        required: true
    },
    offerImage:{
        type: String,
        required: true
    },
    content: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            }
        }
    ],
    schedule:{
        days:{
            type: Schema.Types.Array,
            default: [1,2,3,4,5,6,7]
        },
        dates:{
            type: Schema.Types.Array,
            default: [1,2,3,4,5]
        },
        months:{
            type: Schema.Types.Array,
            default: [1,2,3]
        }
    },
    target:{
        type: String,
        default: 'Everyone'
    },
    pricing:[
        {
            currency:{
                type: String,
                required: true
            }
        }
    ]
}, {timestamps: true})

const Offer = mongoose.model('offers', offerSchema);
module.exports = Offer;