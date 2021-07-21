const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)

app.get('/',(req, res) => {
    const articles = [{
        title: "Test",
        createdAt: Date.now(),
        description: "testing"
    }]
    res.render('index', { articles: articles})
})
app.listen(5000)

