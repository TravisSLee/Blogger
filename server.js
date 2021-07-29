const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)
app.use(express.urlencoded({
    extended: false
}))

app.get('/',(req, res) => {
    const articles = [{
        title: "Test",
        createdAt: new Date(),
        description: "testing"
    }]
    res.render('articles/index', { articles: articles})
})
app.listen(5000)

