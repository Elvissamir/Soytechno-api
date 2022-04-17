const rules = require('../rules/productRules')
const { Schema, Model } = require('mongoose')

const productSchema = new Schema({
    title: {
        type: String,
        minlength: rules.titleMinChars,
        maxlength: rules.titleMaxChars,
        trim: true,
        required: true
    },
    inStock: {
        type: Number,
        min: rules.inStockMin,
        max: rules.inStockMax,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        minlength: rules.descriptionMinChars,
        maxlength: rules.descriptionMaxChars,
        trim: true,
        required: true
    },
    discount: {
        type: Number,
        min: rules.discountMin,
        max: rules.discountMax,
        default: 0
    }, 
    rating: {
        type: Number,
        min: rules.ratingMin,
        max: rules.ratingMax,
        default: null
    }
})

module.exports = Product