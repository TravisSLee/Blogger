const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
   res.render('articles/new', { article: new Article() } ) 
})

router.get('/edit/:id', async (req, res) => {
   const article = await Article.findById(req.params.id)
   res.render('articles/edit', { article: article } ) 
})

router.get('/:slug', async (req, res) => {
   const article = await Article.findOne({slug: req.params.slug})
   if (article == null) res.redirect('/')
   res.render('article/show', { article: article })
})

router.post('/', (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', (req, res) => {

})
router.delete('/:id', async (req, res) => {
   await Article.finfByIdAndDelete(req.params.id)
   res.redirect('/')
})

function saveArticleAndRedirect(path){
   return async (req, res) => {
      let article = req.article 
      article.title = req.body.title
      article.descriptionv= req.body.description
      article.markdown = req.body.markdown
      try{
         article = article.save()
         res.redirect(`/article/${article.slug}`)
      } catch (e) {
         res.render(`articles/${path}`, { article: article})
      }
   }
}
module.exports = router