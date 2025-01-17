const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
    Blog.find({})
      .then(blog => {
        response.json(blog)
      })
      .catch(error => next(error))
  })
  
  blogsRouter.post('/', (request, response, next) => {
    const body = request.body
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

      blog.save()
      .then(savedBlog => {
        response.json(savedBlog)
      })
      .catch(error => next(error))
  })

  module.exports = blogsRouter