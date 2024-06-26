const mongoose = require('mongoose')
const { marked } = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    Createdat: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHTML: {
        type: String,
        required: true
    }
})

postSchema.pre('validate', function(next){
    if (this.title){
        this.slug = slugify(this.title,{lower : true, strict : true})
    }
    if (this.markdown){
        this.sanitizedHTML = dompurify.sanitize(marked(this.markdown))
    }
    next()
})

module.exports = mongoose.model('Post', postSchema)