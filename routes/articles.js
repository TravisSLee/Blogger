const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
   res.render('articles/new', { article: new Article() } ) 
})

router.get('/:sluf', async (req, res) => {
   const article = await Article.findOne({slug: req.params.slug})
   if (article == null) res.redirect('/')
   res.render('article/show', { article: article })
})

router.post('/', (req, res) => {
   let article = new Article({
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown
   })
   try{
      article = article.save()
      res.redirect(`/article/${article.slug}`)
   } catch (e) {
      res.render('articles/new', { article: article})
   }
   
})

router.delete('/:id', async (req, res) => {
   await Article.finfByIdAndDelete(req.params.id)
   res.redirect('/')
})
module.exports = router