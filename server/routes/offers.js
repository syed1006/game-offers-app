const router = require('express').Router();
const Offer = require('../models/Offers');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/handleImages');
const checkCondition = require('../middleware/checkCondition')

router.get('/', async(req, res)=>{
    const {page=1, query, records=10, attribute} = req.query;
    try {
        let data;
        if(query){
            data = await Offer.find({attribute: {$regex: query, $options: '-i'}}).skip((page-1) * records).limit(records);
        }else{
            data = await Offer.find().skip((page-1) * records).limit(records);
        }
        const user = await User.findOne({'_id': req.user});

        console.log('here', Date.now() - Date.parse(user.createdAt));
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;