const express = require('express')
const postRouter = require('./routes/posts')
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')
const Post = require('./models/post')

mongoose.connect('mongodb://localhost:27017/BlogDatabase')

app.set("views", "./view")
app.set('view engine','ejs')
app.use(express.urlencoded({extended : false}))
app.use(methodOverride('_method'))

app.get('/', async(req,res) => {
    const posts = await Post.find().sort({Createdat : 'desc'})
    res.render('posts/index', {posts : posts})
})

app.use('/posts', postRouter)
app.listen(3000)